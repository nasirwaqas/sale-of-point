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
  }
}`
export const EDIT_CATEGORY = gql`
mutation EditCategory(
  $editCategoryId: ID!
  $branchId: ID
  $parentCategory: String
  $name: String
  $description: String
  $color: String
  $image: Upload
  $status: String
) {
  editCategory(
    id: $editCategoryId
    branchId: $branchId
    parent_category: $parentCategory
    name: $name
    description: $description
    color: $color
    image: $image
    status: $status
  ) {
    id
  }
}`