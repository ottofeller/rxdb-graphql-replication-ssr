import gql from 'graphql-tag'

export const UpdateProductMutation = gql`mutation UpdateProduct($id: uuid!, $data: product_set_input) {
  update_product(_set: $data, where: {id: {_eq: $id}}) {
    returning {
      id
      description
      name
      price
      updatedAt
    }
  }
}`
