import * as MemoryAdapter from 'pouchdb-adapter-memory'
import * as R from 'ramda'
import {addRxPlugin, createRxDatabase, RxDumpDatabaseAny, RxJsonSchema} from 'rxdb'
import {Home} from 'Home'
import {RxDBReplicationGraphQLPlugin} from 'rxdb/plugins/replication-graphql'
export default Home

// TODO Add better typings for pullQueryBuilder
export const initDbOnServerSide = async (params: {
  collectionsConfig: Array<{name: string, pullQueryBuilder: (any) => any, schema: RxJsonSchema}>
}): Promise<{
  dbDump: RxDumpDatabaseAny<any>
}> => {
  // For sme reason addRxPlugin(RxDBServerPlugin) call faile with:
  // "Module not found: Can't resolve 'fs' in '.../frontend/node_modules/destroy'"
  addRxPlugin(MemoryAdapter)
  addRxPlugin(RxDBReplicationGraphQLPlugin)
  console.log('Creating db')
  const db = await createRxDatabase({adapter: 'memory', ignoreDuplicate: true, name: 'db'})
  console.log('Creating collections')

  await Promise.all(R.map(collectionConfig => new Promise(async resolve => {
    const collection = await db.collection(collectionConfig)
    console.log('Starting replication')
  
    const replicationState = collection.syncGraphQL({
      deletedFlag: 'deletedAt',
      headers    : {'x-hasura-role': process.env.NEXT_PUBLIC_HASURA_GRAPHQL_UNAUTHORIZED_ROLE || ''},
      live       : true,
      pull       : {modifier: product => product, queryBuilder: collectionConfig.pullQueryBuilder},
      url        : process.env.NEXT_PUBLIC_GRAPHQL_API_URL || '',
    })
  
    console.log('Awaiting for replication')
    await replicationState.awaitInitialReplication()
    resolve(true)
  }), params.collectionsConfig))

  const dbDump = await db.dump()
  console.log('Destroying db')
  await db.destroy()
  return {dbDump}
}
