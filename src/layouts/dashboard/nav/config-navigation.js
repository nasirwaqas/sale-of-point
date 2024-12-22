// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import { title } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  invoice: icon('invoice'),
  sale: icon('sale'),
  category: icon('category'),
  company: icon('company'),
  sellers: icon('sellers'),
  products: icon('products'),
  customers: icon('customers'),
  income: icon('income'),
  expense: icon('expense'),
  purchase: icon('purchase'),
  stock: icon('stock'),
  stockAdjust: icon('stockAdjust'),

  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'sale', path: PATH_DASHBOARD.general.sale, icon: ICONS.sale },
      { title: 'categories', path: PATH_DASHBOARD.general.categories, icon: ICONS.category },
      { title: 'companies', path: PATH_DASHBOARD.general.companies, icon: ICONS.company },

      { title: 'products', path: PATH_DASHBOARD.general.products, icon: ICONS.products },
      { title: 'vendors', path: PATH_DASHBOARD.general.vendors, icon: ICONS.sellers },
      { title: 'customers', path: PATH_DASHBOARD.general.customer, icon: ICONS.customers },

      { title: 'income', 
        path: PATH_DASHBOARD.income.root, 
        icon: ICONS.income,
        children: [
          { title: 'new', path: PATH_DASHBOARD.income.new, icon: ICONS.invoice },
          { title: 'history', path: PATH_DASHBOARD.income.history, icon: ICONS.invoice },
          { title: 'types', path: PATH_DASHBOARD.income.types, icon: ICONS.invoice },
        ],
      },
      { title: 'expense', 
        path: PATH_DASHBOARD.expense.root, 
        icon: ICONS.expense,
        children: [
          { title: 'new', path: PATH_DASHBOARD.expense.new, icon: ICONS.invoice },
          { title: 'history', path: PATH_DASHBOARD.expense.history, icon: ICONS.invoice },
          { title: 'types', path: PATH_DASHBOARD.expense.types, icon: ICONS.invoice },
        ],
      },
      { title: 'purchase', 
        path: PATH_DASHBOARD.purchase.root, 
        icon: ICONS.purchase,
        children: [
          { title: 'order', path: PATH_DASHBOARD.purchase.order, },
          { title: 'return', path: PATH_DASHBOARD.purchase.return, },
        ],
      },

      { title: 'stock', path: PATH_DASHBOARD.general.stock, icon: ICONS.stock },
      { title: 'stock adjustment', path: PATH_DASHBOARD.general.file, icon: ICONS.stockAdjust },

      { title: 'report',
         path: PATH_DASHBOARD.report.root, 
         icon: ICONS.file ,
         children: [
          { title: 'customer Register', path:  PATH_DASHBOARD.report.customerRegister, },
          { title: 'customer Sale Products', path: PATH_DASHBOARD.report.customerSaleProducts, },
          { title: 'purchase History', path: PATH_DASHBOARD.report.purchaseHistory, },
          { title: 'purchase Return History', path: PATH_DASHBOARD.report.purchaseReturnHistory, },
          { title: 'product Purchase History', path: PATH_DASHBOARD.report.productPurchaseHistory, },
          { title: 'sale History', path: PATH_DASHBOARD.report.saleHistory, },
          { title: 'user Sale History', path: PATH_DASHBOARD.report.userSaleHistory, },
          { title: 'shift Sale History', path: PATH_DASHBOARD.report.shiftSaleHistory, },
          { title: 'category Sale History', path: PATH_DASHBOARD.report.categorySaleHistory , },
          { title: 'product Sale History', path: PATH_DASHBOARD.report.productSaleHistory,}  ,
          { title: 'sale History Category Product', path: PATH_DASHBOARD.report.saleHistoryCategoryProduct , },
          { title: 'customer Sale History', path: PATH_DASHBOARD.report.customerSaleHistory, },
          { title: 'sale Summary', path: PATH_DASHBOARD.report.saleSummary, },
          { title: 'sale Return History', path: PATH_DASHBOARD.report.saleReturnHistory, },
          { title: 'cash States', path: PATH_DASHBOARD.report.cashStates, },
          { title: 'product Low Stock', path: PATH_DASHBOARD.report.productLowStock ,},

          { title: 'All Stok', path: PATH_DASHBOARD.report.allStock, },
          { title: 'Stock Expiry', path: PATH_DASHBOARD.report.stockExpiry, },
          { title: 'Zero Stock', path: PATH_DASHBOARD.report.zeroStock, },
          { title: 'Stock Adjustment', path: PATH_DASHBOARD.report.stockAdjustment, },
          { title: 'Vendor Purchase History', path: PATH_DASHBOARD.report.vendorPurchaseHistory ,},
          { title: 'Cash In Hand', path: PATH_DASHBOARD.report.cashInHand, },


         ],
        },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  //     {
  //       title: 'ecommerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //       ],
  //     },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.blog.new },
  //       ],
  //     },
  //     {
  //       title: 'File manager',
  //       path: PATH_DASHBOARD.fileManager,
  //       icon: ICONS.folder,
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     {
  //       title: 'chat',
  //       path: PATH_DASHBOARD.chat.root,
  //       icon: ICONS.chat,
  //     },
  //     {
  //       title: 'calendar',
  //       path: PATH_DASHBOARD.calendar,
  //       icon: ICONS.calendar,
  //     },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },

  // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.lock,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'menu_level_2a',
  //           path: '#/dashboard/menu_level/menu_level_2a',
  //         },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'item_disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'item_external_link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: 'blank',
  //       path: PATH_DASHBOARD.blank,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;
