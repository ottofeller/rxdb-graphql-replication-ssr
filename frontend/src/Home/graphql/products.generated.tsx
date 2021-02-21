/* eslint-disable */
import * as Types from '../../../generated/index';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ProductsQueryVariables = Types.Exact<{
  updatedAt: Types.Scalars['timestamptz'];
}>;


export type ProductsQuery = (
  { __typename?: 'query_root' }
  & { product: Array<(
    { __typename?: 'product' }
    & Pick<Types.Product, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
  )> }
);


export const ProductsDocument = gql`
    query Products($updatedAt: timestamptz!) {
  product(where: {updatedAt: {_gt: $updatedAt}}) {
    id
    description
    name
    price
    updatedAt
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      updatedAt: // value for 'updatedAt'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;