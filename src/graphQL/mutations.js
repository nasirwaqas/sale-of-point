import { gql } from '@apollo/client';

// ==============> TRANSLATION PROJECT <================

export const CREATE_CATEGORY = gql`
mutation CreateCategory(
  $branchId: ID!
  $parentCategory: String!
  $name: String!
  $description: String
  $color: String
  $image: Upload
  $status: String
) {
  createCategory(
    branchId: $branchId
    parent_category: $parentCategory
    name: $name
    description: $description
    color: $color
    image: $image
    status: $status
  ) {
    id
    branchId
    parent_category
    name
    description
    color
    image
    createdAt
    updatedAt
    status
  }
}`