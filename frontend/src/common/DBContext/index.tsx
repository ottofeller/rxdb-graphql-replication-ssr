import * as R from 'ramda'
import * as React from 'react'
import {createRxDatabase, RxCollection, RxDatabase, RxDumpDatabaseAny} from 'rxdb'
import {CollectionConfig} from 'common/db/types'
import {collectionsConfig} from 'config'
import type {RxGraphQLReplicationState} from 'rxdb/plugins/replication-graphql'
type ReplicationStates = Record<string, RxGraphQLReplicationState>

type ContextValue = {
  db: RxDatabase | null
  dbDump?: RxDumpDatabaseAny<any>
  replicationStates?: ReplicationStates
}

export const DBContext = React.createContext<ContextValue>({db: null})

export const DBContextProvider = React.memo(function DBContextProvider(props: {
  children: React.ReactNode
  dbDump?: RxDumpDatabaseAny<any>
}) {
  const [db, setDb] = React.useState<RxDatabase | null>(null)
  const [replicationStates, setReplicationStates] = React.useState<ReplicationStates>({})

  // After the db was created with all the collections, set up replication for each collection
  const startReplication = React.useCallback(async (newDb: RxDatabase) => {
    await Promise.all(R.map(
      (collection: RxCollection) => {
        const collectionConfig: CollectionConfig | undefined = collectionsConfig[collection.name]

        if(!collectionConfig) {
          console.error('The app DB contains collection which is not based on config/collections.tsx')
          return
        }

        // TODO Implement the pull replication through subscriptions
        const newReplicationState = collection.syncGraphQL({
          deletedFlag: 'deletedAt',
          headers    : {'x-hasura-role': process.env.NEXT_PUBLIC_HASURA_GRAPHQL_UNAUTHORIZED_ROLE || ''},
          live       : true,
          pull       : {modifier: product => product, queryBuilder: collectionConfig.pullQueryBuilder},
          push       : {queryBuilder: collectionConfig.pushQueryBuilder},
          url        : process.env.NEXT_PUBLIC_GRAPHQL_API_URL || '',
        })

        setReplicationStates(currentReplicationStates => ({
          ...currentReplicationStates,
          [collection.name]: newReplicationState,
        }))

        newReplicationState.awaitInitialReplication().then(() => {
          console.log('Pull replication is ready')
        })

        newReplicationState.active$.subscribe(active => {
          if(active) {
            console.log('Started replication')
          }

          if(!active) {
            console.log('Finished replication')
          }
        })

        newReplicationState.error$.subscribe(error => {
          console.error(error)
        })
      },

      R.compose(R.values, R.propOr({}, 'collections'))(newDb),
    ))
  }, [])

  // Create DB with all the collections defined for the app
  const createDb = React.useCallback(async (params: {dbDump?: RxDumpDatabaseAny<any>}) => {
    const newDb = await createRxDatabase({adapter: 'idb', name: 'db'})

    await Promise.all(R.map(collectionConfig => newDb.collection({
      autoMigrate: true,
      name       : collectionConfig.name,
      schema     : collectionConfig.schema,
    }), R.values(collectionsConfig)))

    if(params.dbDump) {
      await newDb.importDump(params.dbDump)
    }

    setDb(newDb)
    await startReplication(newDb)
  }, [startReplication])

  React.useEffect(() => {
    if(!db) {
      createDb({dbDump: props.dbDump})
    }
  }, [createDb, db, props.dbDump])

  const value = React.useMemo(
    () => ({db, dbDump: props.dbDump, replicationStates}),
    [db, props.dbDump, replicationStates],
  )

  return <DBContext.Provider value={value}>
    {props.children}
  </DBContext.Provider>
})
