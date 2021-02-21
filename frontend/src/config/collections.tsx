import * as R from 'ramda'
import {CollectionConfig} from 'common/db/types'
import dayjs from 'dayjs'
import {print} from 'graphql/language/printer'
import {Product} from 'generated'
import {ProductsQuery} from 'Home/graphql/products'
import {RxJsonSchema} from 'rxdb'
import {UpdateProductMutation} from 'Home/graphql/update-product'

export const collectionsConfig: Record<string, CollectionConfig> = {
  products: {
    name: 'products',

    // TODO Figure out how to replicate queries in a more granular way, which might be critical on mobile devices
    pullQueryBuilder: product => {
      // The first pull does not have a start-document
      if(!product) {
        // TODO Use the proper date
        product = {id: '', updatedAt: dayjs('1970-01-01 00:00:00').format()}
      }

      return {query: print(ProductsQuery), variables: {updatedAt: product.updatedAt}}
    },

    pushQueryBuilder: product => {
      return {
        query    : print(UpdateProductMutation),
        variables: {data: R.pick(['description', 'name', 'price'], product), id: product.id},
      }
    },

    schema: ((): RxJsonSchema<Omit<Product, '__typename'>> => ({
      properties: {
        createdAt  : {type: 'string'},
        description: {type: ['string', 'null']},
        id         : {primary: true, type: 'string'},
        name       : {type: 'string'},
        price      : {type: 'string'},
        updatedAt  : {type: 'string'},
      },

      title  : 'Product schema',
      type   : 'object',
      version: 0,
    }))(),
  },
}
