import {RxGraphQLReplicationQueryBuilder, RxJsonSchema} from 'rxdb'

export type CollectionConfig = {
  name: string
  pullQueryBuilder: RxGraphQLReplicationQueryBuilder
  pushQueryBuilder: RxGraphQLReplicationQueryBuilder
  schema: RxJsonSchema<any>
}
