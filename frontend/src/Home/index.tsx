import * as R from 'ramda'
import {addRxPlugin, RxDocument} from 'rxdb'
import {Fragment, useCallback, useContext, useEffect, useMemo} from 'react'
import {collectionsConfig} from 'config'
import {DBContext} from 'common/DBContext'
import {hydrateCollectionDump} from 'common/db/helpers'
import {Machine} from 'xstate'
import PouchdbAdapterIdb from 'pouchdb-adapter-idb'
import {RxDBReplicationGraphQLPlugin} from 'rxdb/plugins/replication-graphql'
import {useMachine} from '@xstate/react'
import {useRxCollectionFind} from 'common/db/hooks/use-rx-collection-find'
addRxPlugin(PouchdbAdapterIdb)
addRxPlugin(RxDBReplicationGraphQLPlugin)
let syncTimeout

const machine = Machine({
  id     : 'machine',
  initial: 'loading',

  states: {
    active: {
      initial: 'synced',

      states: {
        synced: {
          on: {
            SYNCING: 'syncing',
          },
        },

        syncing: {
          on: {
            SYNCED: 'synced',
          },
        },
      },
    },

    error: {
    },

    loading: {
      on: {
        INITIAL_DATA_FAILED_TO_LOAD     : 'error',
        INITIAL_DATA_LOADED_SUCCESSFULLY: 'active',
      },
    },
  },
})

function Home() {
  const [current, send] = useMachine(machine)
  const {db, dbDump, replicationStates} = useContext(DBContext)
  const findSelector = useMemo(() => ({selector: {}}), [])

  const products = useRxCollectionFind({
    collection: db?.collections?.products || hydrateCollectionDump({
      dbDump,
      name  : 'products',
      schema: collectionsConfig.products.schema,
    }),

    findParams: findSelector,
  })

  const updateProductOnInputChange = useCallback(
    (params: {event: React.ChangeEvent<HTMLInputElement>, product: RxDocument}) => {
      params.product.update({$set: {name: params.event.currentTarget.value}})
    },

    [],
  )

  // TODO Unsubscribe from the replication state events on exit
  // Turn on/off the syncing indicator when repliaction state changes
  useEffect(() => {
    if(!replicationStates || R.isEmpty(replicationStates)) {
      return
    }

    replicationStates.products.active$.subscribe(active => {
      if(active) {
        send('SYNCING')
      }

      if(!active) {
        clearTimeout(syncTimeout)
        syncTimeout = setTimeout(() => send('SYNCED'), 1000)
      }
    })
  }, [replicationStates, send])

  // Transition to the initial machine's state
  useEffect(() => {
    if(current.matches('active')) {
      return
    }

    if(products) {
      send('INITIAL_DATA_LOADED_SUCCESSFULLY')
      return
    }

    send('INITIAL_DATA_FAILED_TO_LOAD')
  }, [current, products, send])

  return <Fragment>
    <div className="absolute top-0 grid place-items-center p-8">
      {current.matches('active.syncing') && <span
        className="bg-black text-white rounded p-1 px-2 text-sm w-24 text-center"
      > Syncing...</span>}

      {current.matches('active.synced') && <span
        className="bg-black text-white rounded p-1 px-2 text-sm w-24 text-center"
      >Synced</span>}
    </div>

    <div className="grid place-items-center h-screen">
      <div className="w-1/2">
        <h1 className="text-3xl my-6 text-center">Products</h1>

        {/* TODO Use Formik here */}
        {R.map((product: RxDocument) => <div className="grid place-items-center" key={product['id'] || ''}>
          <input
            className="border-gray-800 border-solid border-2 w-full max-w-xl p-2 rounded-md"

            // eslint-disable-next-line react/jsx-no-bind
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateProductOnInputChange({event, product})}

            value={product['name']}
          />

          <br/>
        </div>, products || [])}
      </div>
    </div>
  </Fragment>
}

export {Home}
