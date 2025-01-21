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
// ==============> MANUFACTURES QUERIES <================
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

// ==============> INCOME QUERIES <================
export const GET_INCOME_TYPES_BY_BRANCH = gql`
query GetIncomeTypesByBranch($branchId: ID!) {
  getIncomeTypesByBranch(branchId: $branchId) {
    id
    branchId
    name
    description
  }
}`

export const GET_INCOME_TYPE_BY_ID = gql`
query GetIncomeTypeById($id: ID!) {
  getIncomeTypeById(id: $id) {
    id
    branchId
    name
    description
  }
}`

export const GET_INCOMES_BY_BRANCH = gql`
  query GetIncomesByBranch($branchId: ID!, $incomeTypeId: ID, $fromDate: Date, $toDate: Date) {
    getIncomesByBranch(branchId: $branchId, incomeTypeId: $incomeTypeId, fromDate: $fromDate, toDate: $toDate) {
      incomeItems {
        id
        amount
        description
        createdAt
      }
    }
  }
`

// ==============> EXPENSE QUERIES <================

export const GET_EXPENSE_TYPES_BY_BRANCH = gql`
query GetExpenseTypesByBranch($branchId: ID!) {
  getExpenseTypesByBranch(branchId: $branchId) {
    id
    branchId
    name
    description
  }
}`

export const GET_EXPENSE_TYPE_BY_ID = gql`
query GetExpenseTypeById($id: ID!) {
  getExpenseTypeById(id: $id) {
    id
    branchId
    name
    description
  }
}`

export const GET_EXPENSES_BY_BRANCH = gql`
  query GetExpensesByBranch($branchId: ID!, $expenseTypeId: ID, $fromDate: Date, $toDate: Date) {
    getExpensesByBranch(branchId: $branchId, expenseTypeId: $expenseTypeId, fromDate: $fromDate, toDate: $toDate) {
      expenseItems {
        id
        amount
        description
        createdAt
      }
    }
  }
`

export const GET_VENDORS_BY_BRANCH = gql`
  query GetVendorsByBranch($branchId: ID!) {
    getVendors(branchId: $branchId) {
      id
      name
      phone
      address
      email
      description
      branchId
    }
  }
`;

export const GET_VENDOR_BY_ID = gql`
query GetVendorById($id: ID!) {
  getVendorById(id: $id) {
    id
    branchId
    name
    phone
    email
    address
    description
  }
}`;

export const GET_TOTAL_BALANCE_BY_ID = gql`
  query GetTotalBalanceById($id: ID!) {
    getTotalBalanceById(id: $id)
  }
`;

export const GET_TOTAL_BALANCE_BY_VENDOR_AND_BRANCH = gql`
  query GetTotalBalanceByVendorAndBranch($branchId: ID!, $vendorId: ID!) {
    getTotalBalanceByVendorAndBranch(branchId: $branchId, vendorId: $vendorId)
  }
`;

// export const GET_TOTAL_BALANCE_BY_BRANCH_ID = gql`
//   query GetTotalBalanceByBranchId($branchId: ID!) {
//     getTotalBalanceByBranchId(branchId: $branchId)
//   }
// `;


export const GET_TOTAL_BALANCE_BY_BRANCH_ID = gql`
  query GetTotalBalanceByBranchId($branchId: ID!) {
    getTotalBalanceByBranchId(branchId: $branchId) {
      vendorId
      totalBalance
    }
  }
`;


export const SEARCH_BALANCES = gql`
  query SearchBalances($vendorId: ID!, $fromDate: String, $toDate: String) {
    searchBalances(vendorId: $vendorId, fromDate: $fromDate, toDate: $toDate) {
      balances {
        id
        vendorId
        amount
        type
        date
        description
      }
      totalBalance
    }
  }
`;

// ==============> CUSTOMER QUERIES <================



export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($id: ID!) {
    getCustomerById(id: $id) {
      id
      name
      email
      phone
      address
      cnic
      description
      saleTex
      image
      status
      createdAt
      updatedAt
      branchId
    }
  }
`;

export const GET_CUSTOMERS_BY_BRANCH = gql`
  query GetCustomersByBranch($branchId: ID!) {
    getCustomersByBranch(branchId: $branchId) {
      id
      name
      email
      phone
      address
      cnic
      description
      saleTex
      image
      status
      createdAt
      updatedAt
      branchId
    }
  }`;

export const GET_CUSTOMER_BY_BRANCH = gql`
  query GetCustomerByBranch($branchId: ID!, $area: String, $name: String) {
    getCustomerByBranch(branchId: $branchId, area: $area, name: $name) {
      id
      name
      email
      phone
      address
      cnic
      description
      saleTex
      image
      status
      createdAt
      updatedAt
      branchId
      area
      customerAreaId
    }
  }
`;

export const GET_CUSTOMER_AREAS_BY_BRANCH = gql`
  query GetCustomerAreasByBranch($branchId: ID!) {
    getCustomerAreasByBranch(branchId: $branchId) {
      id
      type
      name
      value
      description
      controlType
      status
      branchId
      createdAt
      updatedAt
    }
  }
`;


// export const GET_TOTAL_BALANCE_BY_ID = gql`
//   query GetTotalBalanceById($id: ID!) {
//     getTotalBalanceById(id: $id)
//   }
// `;

export const GET_TOTAL_BALANCE_BY_BRANCH = gql`
  query GetTotalBalanceByBranch($branchId: ID!) {
    getTotalBalanceByBranch(branchId: $branchId) {
      customerId
      totalBalance
    }
  }
`;


export const SEARCH_CUSTOMER_BALANCE = gql`
  query SearchCustomerBalance($customerId: ID!, $fromDate: String, $toDate: String) {
    searchCustomerBalance(customerId: $customerId, fromDate: $fromDate, toDate: $toDate) {
      balances {
        id
        customerId
        amount
        balanceType
        date
        description
        balance
      }
      totalBalance
    }
  }
`;


export const GET_CUSTOMER_TOTAL_BALANCE_BY_BRANCH_ID = gql`
  query GetCustomerTotalBalanceByBranchId($branchId: ID!) {
    getCustomerTotalBalanceByBranchId(branchId: $branchId) {
      branchId
      totalBalance
    }
  }
`;