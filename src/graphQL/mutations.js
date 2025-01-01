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

export const CREATE_MANUFACTURE = gql`
mutation CreateManufacture($manufactureInput: ManufactureInput) {
  createManufacture(manufactureInput: $manufactureInput) {
    id
    branchId
    name
  }
}`
export const EDIT_MANUFACTURE = gql`
mutation EditManufacture($id: ID!  $manufactureInput: ManufactureInput) {
  editManufacture(id: $id, manufactureInput: $manufactureInput) {
    id
    branchId
    name
    email
    phone
    address
    description
    image
  }
}`
export const DELETE_CATEGORY = gql`
mutation DeleteCategory($deleteCategoryId: ID!) {
  deleteCategory(id: $deleteCategoryId)
}`
export const DELETE_MANUFACTURE = gql`
mutation DeleteManufacture($deleteManufactureId: ID!) {
  deleteManufacture(id: $deleteManufactureId)
}`