import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
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
  TableRow, TableCell ,
  DialogActions,
  Dialog,
  Box,
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
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/category/list';
import VendorsBalanceReport from 'src/sections/@dashboard/general/vendors/VendorsBalanceReport';


// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'vendorName', label: 'Name', align: 'left' },
  { id: 'vendorPhone', label: 'Phone', align: 'left' },
  { id: 'vendorAdddress', label: 'Address', align: 'left' },
  { id: 'vendorAccount', label: 'Account', align: 'left' },
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
  const [showPreview, setShowPreview] = useState(false);
  const [open, setOpen] = useState(false);

  const data= [
    {
      vendorName: "John Doe",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      vendorAccount: "8579827",
      role: "Software Engineer",
      isVerified: true,
      status: "Active",
    
      vendorAddress: "Innovative tech products and solutions",
      vendorPhone: "9230393839",
    },
    {
      vendorName: "Jane Smith",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      vendorPhone: "929393939",
      vendorAccount: "298509",
      vendorAddress: "Organic farming and produce",
      categoryAction: "Explore",
    },
    {
      vendorName: "Mike Brown",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      vendorAccount: "2578",
      vendorAddress: "Product Manager",

      vendorPhone: "Contact",
    },
]

const handleClose = () => {
    setOpen(false);
  };

const handleOpen = () => {
    console.log('Opening dialog...');
    setOpen(true);
  };

  

  const dataFiltered = applyFilter({
    inputData: data ,
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
    navigate(PATH_DASHBOARD.vendors.edit);
  };
  const handleAccountRow = (id) => {
    navigate(PATH_DASHBOARD.vendors.account);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> Vendor | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
         links={[
      { name: 'vendors', href: PATH_DASHBOARD.root },
      ]}
        action={
    <>
      <Button
        component={RouterLink}
        to={PATH_DASHBOARD.vendors.new}
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        New
      </Button>
      
      {/* New Button: Vendors Balance Report */}
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }} // Adds some space between the buttons
        startIcon={<Iconify icon="eva:file-text-fill" />} // You can choose an appropriate icon
      >
        Vendors Balance Report
        
      </Button>



     </>
        }
     />


        <Card>
    
          <UserTableToolbar
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
      <TableCell>{row.vendorName}</TableCell>
        <TableCell>{row.vendorPhone}</TableCell>
        <TableCell>{row.vendorAddress}</TableCell>
        <TableCell>{row.vendorAccount}</TableCell>
      <TableCell>
        <Button 
          variant="outlined" 
          color="primary" 
          size="small" 
          onClick={() => handleEditRow(row.categoryName)}
        >
          Edit
        </Button>
        <Button 
          variant="contained" 
          color="success" 
          size="small" 
          sx={{ ml: 1 }}
          onClick={() => handleAccountRow(row.categoryName)}
        >
          Account
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
            <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
            <VendorsBalanceReport vendors={data} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
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

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
