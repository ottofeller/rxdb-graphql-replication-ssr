import gql from 'graphql-tag'

export const ProductsQuery = gql`query Products($updatedAt: timestamptz!) {
  product(where: {updatedAt: {_gt: $updatedAt}}) {
    id
    description
    name
    price
    updatedAt
  }
}`
