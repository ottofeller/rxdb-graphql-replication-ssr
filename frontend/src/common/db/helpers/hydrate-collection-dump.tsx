import * as R from 'ramda'
import {RxCollection, RxDocument, RxDumpCollection, RxDumpDatabaseAny, RxJsonSchema} from 'rxdb'
import {RxCollectionBase} from 'rxdb/dist/lib/rx-collection'
import {RxDatabaseBase} from 'rxdb/dist/lib/rx-database'

export const hydrateCollectionDump = (params: {
  dbDump?: RxDumpDatabaseAny<any>
  name: string
  schema: RxJsonSchema<any>
}): RxCollection<any> => {
  // Manually create dumb DB and collection for hydration later
  const hydrationDb = new RxDatabaseBase('hydration', 'hydration', 'hydration')

  const hydrationCollection = new RxCollectionBase(
    hydrationDb,
    params.name,
    params.schema,
  )

  // Apply an ugly hack in order to avoid async calls
  if(params.dbDump) {
    hydrationCollection.docs = R.compose<
      RxDumpDatabaseAny<any>,
      Array<RxDumpCollection<any>>,
      RxDumpCollection<any> | undefined,
      Array<RxDocument>
    >(
      R.propOr([], 'docs'),
      R.find<RxDumpCollection<any>>(R.propEq('name', params.name)),
      R.propOr([], 'collections'),
    )(params.dbDump)
  }

  return hydrationCollection
}
