// ----------------------------------------------------------------------




function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    sale: path(ROOTS_DASHBOARD, '/sale'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),

    companies: path(ROOTS_DASHBOARD, '/manufacturer'),
    products: path(ROOTS_DASHBOARD, '/product'),
    vendors: path(ROOTS_DASHBOARD, '/vendors'),
    customer: path(ROOTS_DASHBOARD, '/customer'),
    
    stock: path(ROOTS_DASHBOARD, '/stock'),

  },
  income: {
    root: path(ROOTS_DASHBOARD, '/income'),
    new: path(ROOTS_DASHBOARD, '/income/new'),
    history: path(ROOTS_DASHBOARD, '/income/history'),
    types: path(ROOTS_DASHBOARD, '/income/types'),
    edit: (id) => path(ROOTS_DASHBOARD, `/income/edit/${id}`),
    
  },
  expense: {
    root: path(ROOTS_DASHBOARD, '/expense'),
    new: path(ROOTS_DASHBOARD, '/expense/new'),
    history: path(ROOTS_DASHBOARD, '/expense/history'),
    types: path(ROOTS_DASHBOARD, '/expense/types'),
    edit: (id) => path(ROOTS_DASHBOARD, `/expense/edit/${id}`),
  },
  purchase: {
    root: path(ROOTS_DASHBOARD, '/purchase'),
    order: path(ROOTS_DASHBOARD, '/purchase/order'),
    return: path(ROOTS_DASHBOARD, '/purchase/return'),
  },


  manufacture: {
    root: path(ROOTS_DASHBOARD, '/manufacture'),
    new: path(ROOTS_DASHBOARD, '/manufacture/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/manufacture/edit/${id}`),
  },
  product: {
    root: path(ROOTS_DASHBOARD, '/product'),
    new: path(ROOTS_DASHBOARD, '/product/new'),
    edit: path(ROOTS_DASHBOARD, '/product/edit'),
    setting: path(ROOTS_DASHBOARD, '/product/setting'),
    group: path(ROOTS_DASHBOARD, '/product/group'),
    groupnew: path(ROOTS_DASHBOARD, '/product/group/new'),
    groupedit: path(ROOTS_DASHBOARD, '/product/group/edit'),

  },
  vendors: {
    root: path(ROOTS_DASHBOARD, '/vendors'),
    new: path(ROOTS_DASHBOARD, '/vendors/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/vendors/edit/${id}`),
    account: (id) => path(ROOTS_DASHBOARD, `/vendors/account/${id}`),
  },
  report: {
    
    root: path(ROOTS_DASHBOARD, '/report'),
    customerRegister: path(ROOTS_DASHBOARD, '/report/customer-register'),
    customerSaleProducts: path(ROOTS_DASHBOARD, '/report/customer-sale-products'),
    purchaseHistory: path(ROOTS_DASHBOARD, '/report/purchase-history'),
    purchaseReturnHistory: path(ROOTS_DASHBOARD, '/report/purchase-return-history'),
    productPurchaseHistory: path(ROOTS_DASHBOARD, '/report/product-purchase-history'),
    saleHistory: path(ROOTS_DASHBOARD, '/report/sale-history'),
    userSaleHistory: path(ROOTS_DASHBOARD, '/report/user-sale-history'),
    shiftSaleHistory: path(ROOTS_DASHBOARD, '/report/shift-sale-history'),
    categorySaleHistory: path(ROOTS_DASHBOARD, '/report/category-sale-history'),
    productSaleHistory: path(ROOTS_DASHBOARD, '/report/product-sale-history'),
    saleHistoryCategoryProduct: path(ROOTS_DASHBOARD, '/report/sale-history-category-product'),
    customerSaleHistory: path(ROOTS_DASHBOARD, '/report/customer-sale-history'),
    saleSummary: path(ROOTS_DASHBOARD, '/report/sale-summary'),
    saleReturnHistory: path(ROOTS_DASHBOARD, '/report/sale-return-history'),
    cashStates: path(ROOTS_DASHBOARD, '/report/cash-states'),
    productLowStock: path(ROOTS_DASHBOARD, '/report/product-low-stock'),

    allStock: path(ROOTS_DASHBOARD, '/report/all-stock'),
    stockExpiry: path(ROOTS_DASHBOARD, '/report/stock-expiry'),
    zeroStock: path(ROOTS_DASHBOARD, '/report/zero-stock'),
    stockAdjustment: path(ROOTS_DASHBOARD, '/report/stock-adjustment'),
    vendorPurchaseHistory: path(ROOTS_DASHBOARD, '/report/vendor-purchase-history'),
    cashInHand: path(ROOTS_DASHBOARD, '/report/cash-in-hand'),
    edit: (id) => path(ROOTS_DASHBOARD, `/manufacture/edit/${id}`),
  },
  customer: {
    root: path(ROOTS_DASHBOARD, '/customer'),
    new: path(ROOTS_DASHBOARD, '/customer/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/customer/edit/${id}`),
    account: (id) => path(ROOTS_DASHBOARD, `/customer/account/${id}`),
    message: (id) => path(ROOTS_DASHBOARD, `/customer/message/${id}`),
    balancemessage: path(ROOTS_DASHBOARD, '/customer/balancemessage'),
    import: path(ROOTS_DASHBOARD, '/customer/import'),
    areas: path(ROOTS_DASHBOARD, '/customer/areas'),
  },
  categories: {
    list: path(ROOTS_DASHBOARD, '/categories'),
    new: path(ROOTS_DASHBOARD, '/categories/new'),
    edit: (id) => path(ROOTS_DASHBOARD, `/categories/edit/${id}`),
  },
   user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    edit: path(ROOTS_DASHBOARD, '/user/edit'),

    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    // edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },

};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
