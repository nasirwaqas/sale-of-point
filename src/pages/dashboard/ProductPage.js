import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import * as XLSX from 'xlsx'; // Import xlsx library
// @mui
import {
  Card,
  Table,
  Button,
  Container,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
  Box,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../components/table';
// sections
import ProductTableToolbar from '../../sections/@dashboard/general/products/ProductTableToolbar';
import { GET_PRODUCT_BY_SEARCH_FILTER, GET_PRODUCT_BY_BRANCH } from '../../graphQL/queries'; // Import GET_PRODUCT_BY_BRANCH query
import { EDIT_PRODUCT, DELETE_PRODUCT } from '../../graphQL/mutations';

const TABLE_HEAD = [
  { id: 'skuCode', label: 'Code', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'purchasePrice', label: 'Purchase Price', align: 'left' },
  { id: 'salePrice', label: 'Sale Price', align: 'left' },
  { id: 'discountRs', label: 'Sale Discount', align: 'left' },
  { id: 'formula', label: 'Formula', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

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
  const { enqueueSnackbar } = useSnackbar();
  const { id: paramId } = useParams();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the product to be deleted
  const [filterName, setFilterName] = useState('');
  const [filterData, setFilterData] = useState('All');
  const [products, setProducts] = useState([]);

  const branchId = '60d0fe4f5311236168a109ca'; // Replace with actual branch ID

  const [filterProducts, { loading, error: queryError, data: queryData, refetch }] = useLazyQuery(GET_PRODUCT_BY_SEARCH_FILTER, {
    variables: { branchId },
    onCompleted: (data) => {
      setProducts(data.getProductBySearchFilter);
    },
  });

  const [getProductsByBranch] = useLazyQuery(GET_PRODUCT_BY_BRANCH, {
    variables: { branchId },
    onCompleted: (data) => {
      exportToExcel(data.getProductByBranch);
    },
  });

  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  let tableData = [];
  if (products.length) {
    tableData = products;
  } else if (queryData) {
    tableData = queryData.getProductBySearchFilter;
  }

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterData,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleFilterBy = (event) => {
    setPage(0);
    const value = event.target.value;
    let status = null;
    let saleDiscount = null;

    if (value !== 'All') {
      if (value === 'Discount Products') {
        saleDiscount = 0;
      } else {
        status = value;
      }
    }

    setFilterData(value);
    filterProducts({ variables: { branchId, status, saleDiscount, name: filterName } });
  };

  const handleFilterByName = (event) => {
    setPage(0);
    const value = event.target.value;
    setFilterName(value);

    let status = null;
    let saleDiscount = null;

    if (filterData !== 'All') {
      if (filterData === 'Discount Products') {
        saleDiscount = 0;
      } else {
        status = filterData;
      }
    }

    filterProducts({ variables: { branchId, status, saleDiscount, name: value } });
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.product.edit(id));
  };

  const handleStatusRow = async (id, status) => {
    try {
      console.log('Updating product status:', { id, status }); // Log the input data
      await editProduct({
        variables: {
          id,
          input: { status },
        },
      });
      refetch();
      enqueueSnackbar('Product status updated successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error updating status:', error);
      enqueueSnackbar('Failed to update product status', { variant: 'error' });
    }
  };

  const handleDeleteRow = async () => {
    try {
      await deleteProduct({
        variables: { id: deleteId },
      });
      refetch();
      setSelected([]);
      enqueueSnackbar('Product deleted successfully', { variant: 'success' });
      handleCloseConfirm();
    } catch (error) {
      console.error('Error deleting product:', error);
      enqueueSnackbar('Failed to delete product', { variant: 'error' });
    }
  };

  const handleDeleteRows = async (selectedRows) => {
    try {
      await Promise.all(
        selectedRows.map((id) =>
          deleteProduct({
            variables: { id },
          })
        )
      );
      refetch();
      setSelected([]);
      enqueueSnackbar('Products deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting rows:', error);
      enqueueSnackbar('Failed to delete products', { variant: 'error' });
    }
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterData('All');
    filterProducts({ variables: { branchId, status: null, saleDiscount: null, name: '' } });
  };

  const handleExport = () => {
    getProductsByBranch();
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'Products.xlsx');
  };

  return (
    <>
      <Helmet>
        <title>Product | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[{ name: 'Product', href: PATH_DASHBOARD.root }]}
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
              <Button variant="contained" sx={{ ml: 1 }}>
                Print Barcode
              </Button>
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
                Product Group
              </Button>
              <Button variant="contained" sx={{ ml: 1 }} onClick={handleExport}>
                Export
              </Button>
            </div>
          }
        />

        <Card>
          <ProductTableToolbar
            filterName={filterName}
            filterData={filterData}
            onFilterName={handleFilterByName}
            onFilterData={handleFilterBy}
            onResetFilter={handleResetFilter}
            branchId={branchId}
            onSearchResults={setProducts} // Pass setProducts as onSearchResults
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
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={8}>Loading...</TableCell>
                    </TableRow>
                  )}
                  {queryError && (
                    <TableRow>
                      <TableCell colSpan={8}>Error: {queryError.message}</TableCell>
                    </TableRow>
                  )}
                  {dataInPage.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.skuCode}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.purchasePrice}</TableCell>
                      <TableCell>{row.salePrice}</TableCell>
                      <TableCell>{row.discountPercentage}</TableCell>
                      <TableCell>{row.formula}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ minWidth: '50px', fontSize: '0.75rem', padding: '4px 8px' }}
                            onClick={() => handleEditRow(row.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color={row.status === 'Active' ? 'success' : 'warning'}
                            size="small"
                            sx={{ ml: 1, minWidth: '50px', fontSize: '0.75rem', padding: '4px 8px' }}
                            onClick={() => handleStatusRow(row.id, row.status === 'Active' ? 'Inactive' : 'Active')}
                          >
                            {row.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ ml: 1, minWidth: '50px', fontSize: '0.75rem', padding: '4px 8px' }}
                            onClick={() => handleOpenConfirm(row.id)}
                          >
                            Delete
                          </Button>
                        </Box>
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
            Are you sure you want to delete this product?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterData }) {
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
      (item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterData && filterData !== 'All') {
    if (filterData === 'Discount Products') {
      inputData = inputData.filter((item) => item.discountRs > 0);
    } else {
      inputData = inputData.filter((item) => item.status === filterData);
    }
  }

  return inputData;
}