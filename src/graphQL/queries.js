import { gql } from '@apollo/client';

// ==============> LOGIN <================
export const LOGIN_USER = gql`
query Login($username: String, $password: String) {
  login(username: $username, password: $password) {
    id
    password
    email
    role
    name
    permission
    token
  }
}
`
export const GET_CATEGORIES_BY_BRANCH = gql`
query GetCategoriesByBranch(
  $branchId: ID!
  $limit: Int
  $name: String
  $offset: Int
  $orderBy: String
  $order: String
) {
  getCategoriesByBranch(
    branchId: $branchId
    limit: $limit
    name: $name
    offset: $offset
    orderBy: $orderBy
    order: $order
  ) {
    categoryItems {
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
    filterCount
    total
  }
}`
export const GET_CATEGORY_BY_ID = gql`
query GetCategoryById($id: ID!) {
  getCategoryById(id: $id) {
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

export const GET_MANUFACTURES_BY_BRANCH = gql`
query GetManufacturesByBranch(
  $branchId: ID!
  $name: String
  $limit: Int
  $offset: Int
  $orderBy: String
  $order: String
) {
  getManufacturesByBranch(
    branchId: $branchId
    name: $name
    limit: $limit
    offset: $offset
    orderBy: $orderBy
    order: $order
  ) {
    Items {
      id
      branchId
      name
      email
      phone
      address
      description
      image
    }
    filterCount
    total
  }
}`

export const GET_MANUFACTURE_BY_ID = gql`
query GetManufactureById($id: ID!) {
  getManufactureById(id: $id) {
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