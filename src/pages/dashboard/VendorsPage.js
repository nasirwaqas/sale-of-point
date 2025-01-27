import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// @mui
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableRow,
  TableCell,
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
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from '../../components/table';
// sections
import { UserTableToolbar } from '../../sections/@dashboard/category/list';
import { GET_VENDORS_BY_BRANCH, GET_TOTAL_BALANCE_BY_BRANCH_ID } from '../../graphQL/queries';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'totalBalance', label: 'Account', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

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

  const { data, error, loading, refetch } = useQuery(GET_VENDORS_BY_BRANCH, {
    variables: {
      branchId: '6770c752a14170831ad68c75',
    },
    fetchPolicy: 'no-cache',
    onCompleted: (responseData) => {
      setTableData(responseData.getVendors);
    },    
  });

  const { data: balanceData, loading: balanceLoading } = useQuery(GET_TOTAL_BALANCE_BY_BRANCH_ID, {
    variables: {
      branchId: '6770c752a14170831ad68c75',
    },
    fetchPolicy: 'no-cache',
  });

  const denseHeight = dense ? 52 : 72;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredData = tableData.filter((vendor) =>
    vendor.name.toLowerCase().includes(filterName.toLowerCase()) ||
    vendor.phone.toLowerCase().includes(filterName.toLowerCase()) ||
    vendor.address.toLowerCase().includes(filterName.toLowerCase()) ||
    vendor.email.toLowerCase().includes(filterName.toLowerCase()) ||
    vendor.description.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleEditRow = (id) => {
    console.log('Vendor ID passed to edit:', id);  // Log the ID to the console
    navigate(PATH_DASHBOARD.vendors.edit(id));  // Navigate to the edit page
  };

  const handleAccountRow = (id) => {
    console.log('Vendor ID passed to Account:', id);  // Log the ID to the console
    navigate(`/dashboard/vendors/account/${id}`);  // Navigate to the account page with the correct URL
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
    // Add actual deletion logic here (e.g., API call)
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
                  {!data && loading && <TableSkeleton />}
                  {data &&
                    !loading &&
                    filteredData.map((row) => {
                      const totalBalance = balanceData?.getTotalBalanceByBranchId.find(
                        (balance) => balance.vendorId === row.id
                      )?.totalBalance || 'N/A';

                      return (
                        <TableRow key={row.id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.address}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{totalBalance}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => handleEditRow(row.id)} // Edit button click
                              style={{ marginRight: 8 }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="outlined"
                              color="info"
                              size="small"
                              onClick={() => handleAccountRow(row.id)} // Account button click
                              style={{ marginRight: 8 }}
                            >
                              Account
                            </Button>

                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDeleteVendor(row.id)} // Delete button click
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}

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

// ----------------------------------------------------------------------

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