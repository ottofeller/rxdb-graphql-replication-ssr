import {MangoQuery, RxCollection, RxDocument} from 'rxdb'
import {useCallback, useEffect, useState} from 'react'

// A React-ish way to interact with async RxDB Collections
// A Rect component that uses the hook updates the find params object, and then updates its state after the collection
// query is done.
export const useRxCollectionFind = (params: {
  collection: RxCollection<any>
  findParams: MangoQuery<any>
}): Array<RxDocument> => {
  // Make sure that initial value is available during the hydration
  const [documents, setDocuments] = useState(params.collection.docs)

  const findExec = useCallback(async (findParams: MangoQuery<any>) => {
    if(params.collection.$) {
      setDocuments(await params.collection.find(findParams).exec())
    }
  }, [params.collection])

  // Update th documents array once the find aprams change
  useEffect(() => {
    findExec(params.findParams)
  }, [findExec, params.findParams])

  // Subscribe to all incoming updates, including replication updates
  useEffect(() => {
    // TODO Find out how to unsubscribe
    if(params.collection.$) {
      params.collection.$.subscribe(() => findExec(params.findParams))
    }
  }, [findExec, params.collection, params.findParams])

  return documents
}
