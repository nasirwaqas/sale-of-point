import { useQuery, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
  TableRow, TableCell,
  DialogActions,
  Dialog,
  Box,
  TableContainer,
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
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import CustomersBalanceReport from '../../sections/@dashboard/general/customers/CustomersBalanceReport';
import CustomerTableToolbar from '../../sections/@dashboard/general/customers/CustomerTableToolbar';
import { GET_CUSTOMERS_BY_BRANCH, GET_TOTAL_BALANCE_BY_BRANCH, GET_CUSTOMER_TOTAL_BALANCE_BY_BRANCH_ID } from '../../graphQL/queries';
import { EDIT_CUSTOMER, DELETE_CUSTOMER } from '../../graphQL/mutations';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'cnic', label: 'CNIC', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'account', label: 'Account', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function CustomerPage() {
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
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the customer to be deleted
  const [filterName, setFilterName] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const branchId = '60d0fe4f5311236168a109ca'; // Replace with dynamic branchId as needed

  const { data, loading, error: queryError, refetch } = useQuery(GET_CUSTOMERS_BY_BRANCH, {
    variables: { branchId },
  });

  const { data: balanceData, loading: balanceLoading, error: balanceError } = useQuery(GET_TOTAL_BALANCE_BY_BRANCH, {
    variables: { branchId },
  });

  const { data: totalBalanceData, loading: totalBalanceLoading, error: totalBalanceError } = useQuery(GET_CUSTOMER_TOTAL_BALANCE_BY_BRANCH_ID, {
    variables: { branchId },
  });

  const [editCustomer] = useMutation(EDIT_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  const handleClose = () => {
    setOpen(false);
    setShowReport(false);
  };

  const handleOpen = () => {
    console.log('Opening dialog...');
    console.log('Filtered data:', dataFiltered); // Log the filtered data
    setOpen(true);
    setShowReport(true);
  };

  const handleDeleteRows = async (selectedRows) => {
    // Implement the delete logic here
    console.log('Deleting rows:', selectedRows);
    try {
      await Promise.all(
        selectedRows.map((id) =>
          deleteCustomer({
            variables: { deleteCustomerId: id },
          })
        )
      );
      refetch();
      setSelected([]);
      enqueueSnackbar('Customers deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting rows:', error);
      enqueueSnackbar('Failed to delete customers', { variant: 'error' });
    }
  };

  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };

  const handleEditRow = (id) => {
    console.log('Edit customer ID:', id); // Log the customer ID
    navigate(PATH_DASHBOARD.customer.edit(id));
  };

  const handleAccountRow = (id) => {
    console.log('Account customer ID:', id); // Log the customer ID
    navigate(PATH_DASHBOARD.customer.account(id));
  };

  const handleDeleteRow = async () => {
    // Perform the deletion using the DELETE_CUSTOMER mutation
    console.log('Deleting row:', deleteId);
    try {
      await deleteCustomer({
        variables: { deleteCustomerId: deleteId },
      });
      refetch(); // Refetch the table data after deletion
      handleCloseConfirm();
      enqueueSnackbar('Customer deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting row:', error);
      enqueueSnackbar('Failed to delete customer', { variant: 'error' });
    }
  };

  const handleStatusRow = async (id, status) => {
    try {
      await editCustomer({
        variables: {
          id,
          status,
        },
      });
      refetch();
      enqueueSnackbar('Customer status updated successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error updating status:', error);
      enqueueSnackbar('Failed to update customer status', { variant: 'error' });
    }
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const handleFilterArea = (areaId) => {
    setFilterArea(areaId);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterArea('');
  };

  const handleAreaSelect = (areaId) => {
    setSelectedAreaId(areaId);
    setFilterArea(areaId); // Ensure the filter state is updated
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const denseHeight = dense ? 52 : 72;

  if (loading || balanceLoading || totalBalanceLoading) return <div>Loading...</div>;
  if (queryError || balanceError || totalBalanceError) return <div>Error loading data</div>;

  const customers = searchResults.length > 0 ? searchResults : data?.getCustomersByBranch || [];
  const customerBalances = balanceData?.getTotalBalanceByBranch || [];
  const totalBalance = totalBalanceData?.getCustomerTotalBalanceByBranchId?.totalBalance || 0;

  const getCustomerBalance = (customerId) => {
    const customerBalance = customerBalances.find((balance) => balance.customerId === customerId);
    return customerBalance ? customerBalance.totalBalance : 0;
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesArea = filterArea ? customer.customerAreaId === filterArea : true;
    const matchesName = filterName ? customer.name.toLowerCase().includes(filterName.toLowerCase()) : true;
    return matchesArea && matchesName;
  });
  const dataFiltered = [...filteredCustomers].sort(getComparator(order, orderBy));
  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log('Filtered customers data:', dataFiltered); // Add this line to log the filtered customers data

  return (
    <>
      <Helmet>
        <title> customer | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[{ name: 'customer', href: PATH_DASHBOARD.root }]}
          action={(
            <>
              <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }} // Adds some space between the buttons
              >
                customers Balance Report
              </Button>
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.customer.balancemessage}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }} // Adds some space between the buttons
              >
                Send Balance Message
              </Button>
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.customer.areas}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }} // Adds some space between the buttons
              >
                Areas
              </Button>
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.customer.import}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }} // Adds some space between the buttons
              >
                Import
              </Button>
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.customer.import}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }} // Adds some space between the buttons
              >
                Export
              </Button>
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.customer.new}
                variant="contained"
                sx={{ ml: 2 }} // Adds some space between the buttons
              >
                New
              </Button>
            </>
          )}
        />

        <Card>
          <CustomerTableToolbar
            filterName={filterName}
            filterArea={filterArea}
            onFilterName={handleFilterName}
            onFilterArea={handleFilterArea}
            onResetFilter={handleResetFilter}
            isFiltered={Boolean(filterName || filterArea)}
            onAreaSelect={handleAreaSelect} // Pass the function here
            onSearchResults={handleSearchResults} // Pass the function here
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataInPage.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataInPage.map((row) => (
                    <TableRow key={row.id} hover tabIndex={-1}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.cnic}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{getCustomerBalance(row.id)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEditRow(row.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => handleAccountRow(row.id)}
                        >
                          Account
                        </Button>
                        <Button
                          variant="contained"
                          color={row.status === 'active' ? 'success' : 'warning'}
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => handleStatusRow(row.id, row.status === 'active' ? 'deactive' : 'active')}
                        >
                          {row.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => handleOpenConfirm(row.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, dataInPage.length)}
                  />
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell colSpan={2} align="right" sx={{ fontWeight: 'bold' }}>
                      Total Balance: {totalBalance}
                    </TableCell>
                  </TableRow>
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
        {showReport && (
          <Box sx={{ mt: 3 }}>
            <PDFViewer width="100%" height="600">
              <CustomersBalanceReport customers={dataFiltered} getCustomerBalance={getCustomerBalance} totalBalance={totalBalance} />
            </PDFViewer>
          </Box>
        )}
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={(
          <>
            Are you sure you want to delete this customer?
          </>
        )}
        action={(
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
          >
            Delete
          </Button>
        )}
      />
   
    </>
  );
}
