import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import { UserTableRow } from '../../sections/@dashboard/category/list';
import { ProductTableToolbar } from '../../sections/@dashboard/general/products'
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'Active',
  'Deactive',
  'Discount Products',
];

const TABLE_HEAD = [
  { id: 'productCode', label: 'Code', align: 'left' },
  { id: 'productName', label: 'Name', align: 'left' },
  { id: 'productCategory', label: 'Category', align: 'left' },
  { id: 'purchasePrice', label: 'Purchase Price', align: 'left' },
  { id: 'salePrice', label: 'Sale Price', align: 'left' },
  { id: 'saleDiscount', label: 'Sale Discount', align: 'left' },
  { id: 'productFormula', label: 'Formula', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];
// ----------------------------------------------------------------------

export default function ProductPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const data = [
    {
      productCode: 'P001',
      productName: 'Vitamin C Tablets',
      productCategory: 'Health Supplements',
      purchasePrice: '$10',
      salePrice: '$15',
      saleDiscount: '10%',
      productFormula: 'Ascorbic Acid 500mg',
    },
    {
      productCode: 'P002',
      productName: 'Pain Relief Balm',
      productCategory: 'Topical Treatments',
      purchasePrice: '$5',
      salePrice: '$8',
      saleDiscount: '5%',
      productFormula: 'Menthol and Camphor',
    },
    {
      productCode: 'P003',
      productName: 'Herbal Tea',
      productCategory: 'Beverages',
      purchasePrice: '$3',
      salePrice: '$6',
      saleDiscount: '15%',
      productFormula: 'Chamomile and Green Tea',
    },
  ];

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.product.edit);
  };

  const handleDeleteRows = (selectedRows) => {
    // Implement the delete logic here
    console.log('Deleting rows:', selectedRows);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title>Product | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[
            { name: 'Product', href: PATH_DASHBOARD.root },
          ]}
          action={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.product.new}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New
              </Button>
              <Button variant="contained" sx={{ ml: 1 }}>Print Barcode</Button>
              <Button 
              component={RouterLink}
              to={PATH_DASHBOARD.product.setting}
              variant="contained" 
              sx={{ ml: 1 }}
              >
                Settings
                </Button>

              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.product.group}
                variant="contained" 
                sx={{ ml: 1 }}
               >
                Product Group</Button>
              <Button variant="contained" sx={{ ml: 1 }}>Export</Button>
            </div>
          }
        />

        <Card>
          <ProductTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataInPage.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.productCode}</TableCell>
                      <TableCell>{row.productName}</TableCell>
                      <TableCell>{row.productCategory}</TableCell>
                      <TableCell>{row.purchasePrice}</TableCell>
                      <TableCell>{row.salePrice}</TableCell>
                      <TableCell>{row.saleDiscount}</TableCell>
                      <TableCell>{row.productFormula}</TableCell>

                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEditRow(row.productCode)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ ml: 1 }} // Add some margin between buttons
                        >
                          Active
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // Apply filters
  if (filterName) {
    inputData = inputData.filter(
      (item) => item.productName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}