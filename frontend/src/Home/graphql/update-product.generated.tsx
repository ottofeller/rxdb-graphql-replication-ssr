/* eslint-disable */
import * as Types from '../../../generated/index';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UpdateProductMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid'];
  data?: Types.Maybe<Types.Product_Set_Input>;
}>;


export type UpdateProductMutation = (
  { __typename?: 'mutation_root' }
  & { update_product?: Types.Maybe<(
    { __typename?: 'product_mutation_response' }
    & { returning: Array<(
      { __typename?: 'product' }
      & Pick<Types.Product, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
    )> }
  )> }
);


export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: uuid!, $data: product_set_input) {
  update_product(_set: $data, where: {id: {_eq: $id}}) {
    returning {
      id
      description
      name
      price
      updatedAt
    }
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;