import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,
  GeneralFilePage,
  GeneralBankingPage,
  GeneralBookingPage,
  GeneralEcommercePage,
  GeneralCategoryPage,

  // Dashboard: User
  UserListPage,
  UserEditPage,
  UserCardsPage,
  UserCreatePage,
  UserProfilePage,
  UserAccountPage,
  // Dashboard: Ecommerce
  EcommerceShopPage,
  EcommerceCheckoutPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductCreatePage,
  EcommerceProductDetailsPage,
  // Dashboard: Invoice
  InvoiceListPage,
  InvoiceDetailsPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  // Dashboard: Blog
  BlogPostsPage,
  BlogPostPage,
  BlogNewPostPage,
  // Dashboard: FileManager
  FileManagerPage,
  // Dashboard: App
  ChatPage,
  MailPage,
  CalendarPage,
  KanbanPage,
  //
  BlankPage,
  PermissionDeniedPage,
  CategoryPage,
  CategoryNewPage,
  CategoryEditPage,
  ManufacturePage,
  ManufactureNewPage,
  ManufactureEditForm,
  ProductPage,
  ProductEditForm,
  ProductNewPage,
  ProductSetting,
  ProductGroup,
  ProductGroupNew,
  ProductGroupEdit,
  VendorsPage,
  VendorsNewPage,
  VendorsEditForm,
  VendorsAccount,

  CustomerPage,
  CustomerNewPage,
  CustomerEditForm,
  CustomerAccount,
  CustomerSendMessage,
  CustomerSendBalanceMessage,
  CustomerImport,
  CustomerAreas,
  IncomeNew,
  IncomeHistory,
  IncomeTypes,
  ExpenseNew,
  ExpenseHistory,
  ExpenseTypes,
  Purchase,
  PurchaseReturn,
  SaleInvoice,
  Stock,
  // Report
  CustomerRegister,
  CustomerSaleProducts,
  PurchaseHistory,
  PurchaseReturnHistory,
  ProductPurchaseHistory,
  SaleHistory,
  UserSaleHistory,
  ShiftSaleHistory,
  CategorySaleHistory,
  ProductSaleHistory,
  SaleHistoryCategoryProduct,
  CustomerSaleHistory,
  SaleSummary,
  SaleReturnHistory,
  CashStates,
  ProductLowStock,

  AllStock,
  StockExpiry,
  ZeroStock,
  StockAdjustment,
  VendorPurchaseHistory,
  CashInHand,
  IncomeTypeEdit,
  ExpenseTypeEdit,

} from './elements';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: '/',
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },

    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        // { path: 'login-unprotected', element: <LoginPage /> },
        // { path: 'register-unprotected', element: <RegisterPage /> },
        // {
          // element: <CompactLayout />,
          // children: [
            // { path: 'reset-password', element: <ResetPasswordPage /> },
            // { path: 'new-password', element: <NewPasswordPage /> },
            // { path: 'verify', element: <VerifyCodePage /> },
          // ],
        // },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'sale', element: <SaleInvoice /> },
       
        {  path: 'stock', element: <Stock/>},
       

        { path: 'product', element: <ProductPage /> },
        { path: '/dashboard/product/new', element: <ProductNewPage /> },
        { path: '/dashboard/product/edit', element: <ProductEditForm /> },
        { path: '/dashboard/product/setting', element: <ProductSetting /> },
        { path: '/dashboard/product/group', element: <ProductGroup /> },
        { path: '/dashboard/product/group/new', element: <ProductGroupNew /> },
        { path: '/dashboard/product/group/edit', element: <ProductGroupEdit /> },

         { path: 'vendors', element: <VendorsPage /> },
         { path: '/dashboard/vendors/new', element: <VendorsNewPage /> },
         { path: '/dashboard/vendors/edit', element: <VendorsEditForm /> },
         { path: '/dashboard/vendors/account' , element: <VendorsAccount />},

         { path: 'customer', element: <CustomerPage /> },
         { path: '/dashboard/customer/new', element: <CustomerNewPage /> },
         { path: '/dashboard/customer/edit', element: <CustomerEditForm /> },
         { path: '/dashboard/customer/account', element: <CustomerAccount />},
         { path: '/dashboard/customer/message', element: <CustomerSendMessage />},
         { path: '/dashboard/customer/balancemessage', element: <CustomerSendBalanceMessage />},
         { path: '/dashboard/customer/import', element: <CustomerImport />},
         {  path: '/dashboard/customer/areas', element: <CustomerAreas />},
        
      

        { path: 'analytics', element: <GeneralCategoryPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },
        {
          path: 'categories',
          children: [
            // { element: <Navigate to="/dashboard/categories" replace />, index: true },
            { path: '', element: <CategoryPage /> },
            { path: 'new', element: <CategoryNewPage /> },
            { path: 'edit/:id', element: <CategoryEditPage /> },
          ],
        },        
        {
          path: 'manufacture',
          children: [
            { path: '', element: <ManufacturePage /> },
            { path: 'new', element: <ManufactureNewPage /> },
            { path: 'edit/:id', element: <ManufactureEditForm /> },
          ],
        },
        {
          path: 'income',
          children: [
            { element: <Navigate to="/dashboard/income/new" replace />, index: true },
            { path: 'new', element: <IncomeNew /> },
            { path: 'history', element: <IncomeHistory /> },
            { path: 'types', element: <IncomeTypes /> },
            {  path: 'edit/:id', element: <IncomeTypeEdit /> },
          ],
        },
        {
          path: 'expense',
          children: [
            { element: <Navigate to="/dashboard/expense/new" replace />, index: true },
            { path: 'new', element: <ExpenseNew /> },
            { path: 'history', element: <ExpenseHistory /> },
            { path: 'types', element: <ExpenseTypes /> },
            {  path: 'edit/:id', element: <ExpenseTypeEdit /> },
          ],
        },
        {
          path: 'purchase',
          children: [
            { element: <Navigate to="/dashboard/purchase/order" replace />, index: true },
            { path: 'order', element: <Purchase /> },
            { path: 'return', element: <PurchaseReturn /> },
          ],
        },

        {
          path: 'report',
          children: [
            { element: <Navigate to="/dashboard/report/customerRegister" replace />, index: true },
            {  path: 'customer-register', element: <CustomerRegister /> },
            {  path: 'customer-sale-products', element: <CustomerSaleProducts /> },
            {  path: 'purchase-history', element: <PurchaseHistory /> },
            {  path: 'purchase-return-history', element: <PurchaseReturnHistory /> },
            {  path: 'product-purchase-history', element: <ProductPurchaseHistory /> },
            {  path: 'sale-history', element: <SaleHistory /> },
            {  path: 'user-sale-history', element: <UserSaleHistory /> },
            {  path: 'shift-sale-history', element: <ShiftSaleHistory /> },
            {  path: 'category-sale-history', element: <CategorySaleHistory /> },
            {  path: 'product-sale-history', element: <ProductSaleHistory /> },
            {  path: 'sale-history-category-product', element: <SaleHistoryCategoryProduct /> },
            {  path: 'customer-sale-history', element: <CustomerSaleHistory /> },
            {  path: 'sale-summary', element: <SaleSummary /> },
            {  path: 'sale-return-history', element: <SaleReturnHistory /> },
            {  path: 'cash-states', element: <CashStates /> },
            {  path: 'product-low-stock', element: <ProductLowStock /> },

            { path: 'all-stock', element: <AllStock />, },
            { path: 'stock-expiry', element: <StockExpiry />, },
            { path: 'zero-stock', element: <ZeroStock />, },
            { path: 'stock-adjustment', element: <StockAdjustment />, },
            { path: 'vendor-purchase-history', element: <VendorPurchaseHistory /> ,},
            { path: 'cash-in-hand', element: <CashInHand />, },

          ],
        },
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShopPage /> },
            { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'product/new', element: <EcommerceProductCreatePage /> },
            { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: 'edit', element: <CategoryEditPage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
          ],
        },
        { path: 'files-manager', element: <FileManagerPage /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <MailPage /> },
            { path: 'label/:customLabel/:mailId', element: <MailPage /> },
            { path: ':systemLabel', element: <MailPage /> },
            { path: ':systemLabel/:mailId', element: <MailPage /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <ChatPage />, index: true },
            { path: 'new', element: <ChatPage /> },
            { path: ':conversationKey', element: <ChatPage /> },
          ],
        },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
