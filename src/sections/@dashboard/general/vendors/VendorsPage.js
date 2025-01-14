import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from '../../components/table';
import { UserTableToolbar } from '../../sections/@dashboard/category/list';
import { GET_VENDORS_BY_BRANCH, GET_TOTAL_BALANCE_BY_BRANCH_ID } from '../../graphQL/queries';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'totalBalance', label: 'Total Balance', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

export default function VendorsPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [balances, setBalances] = useState({});

  const branchId = '6770c752a14170831ad68c75';

  const { data: vendorsData, error: vendorsError, loading: vendorsLoading, refetch: refetchVendors } = useQuery(GET_VENDORS_BY_BRANCH, {
    variables: { branchId },
    fetchPolicy: 'no-cache',
    onCompleted: (responseData) => {
      setTableData(responseData.getVendors);
      console.log('Vendors data:', responseData.getVendors);
    },
  });

  const { data: branchBalanceData, error: branchBalanceError, loading: branchBalanceLoading } = useQuery(GET_TOTAL_BALANCE_BY_BRANCH_ID, {
    variables: { branchId },
    fetchPolicy: 'no-cache',
    onCompleted: (responseData) => {
      const balances = responseData.getTotalBalanceByBranchId.reduce((acc, balance) => {
        acc[balance.vendorId] = balance.totalBalance;
        return acc;
      }, {});
      setBalances(balances);
      console.log('Total branch balance:', responseData.getTotalBalanceByBranchId);
    },
    onError: (error) => {
      console.error('Error fetching total balances:', error);
    },
  });

  const denseHeight = dense ? 52 : 72;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id) => {
    console.log('Vendor ID passed to edit:', id);
    navigate(PATH_DASHBOARD.vendors.edit(id));
  };

  const handleAccountRow = (id) => {
    console.log('Vendor ID passed to Account:', id);
    navigate(`/dashboard/vendors/account/${id}`);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRows = (selectedRows) => {
    console.log('Deleting rows:', selectedRows);
    setSelected([]);
    handleCloseConfirm();
  };

  const handleDeleteVendor = (id) => {
    console.log(`Deleting vendor with ID: ${id}`);
  };

  return (
    <>
      <Helmet>
        <title>Vendors | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Vendors' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.vendors.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New
            </Button>
          }
        />

        <Card>
          <UserTableToolbar filterName={filterName} onFilterName={handleFilterName} />
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
                  {!vendorsData && vendorsLoading && <TableSkeleton />}
                  {vendorsData &&
                    !vendorsLoading &&
                    tableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          {balances[row.id] !== undefined ? (
                            <Typography variant="body2">{balances[row.id]}</Typography>
                          ) : (
                            <Typography variant="body2">Loading...</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleEditRow(row.id)}
                            style={{ marginRight: 8 }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            onClick={() => handleAccountRow(row.id)}
                            style={{ marginRight: 8 }}
                          >
                            Account
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteVendor(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
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

function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (vendor) => vendor.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
