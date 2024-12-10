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
import CustomersBalanceReport from 'src/sections/@dashboard/general/customers/CustomersBalanceReport';
import CustomerTableToolbar from 'src/sections/@dashboard/general/customers/CustomerTableToolbar';


// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const AREA_OPTIONS = [
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
  { id: 'customerName', label: 'Name', align: 'left' },
  { id: 'customerPhone', label: 'Phone', align: 'left' },
  { id: 'customerCnic', label: 'CNIC', align: 'left' }, // Added CNIC column
  { id: 'customerAdddress', label: 'Address', align: 'left' },
  { id: 'customerAccount', label: 'Account', align: 'left' },
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

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [open, setOpen] = useState(false);

  const data = [
    {
      customerName: "John Doe",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      customerAccount: "8579827",
      customerPhone: "9230393839",
      customerAddress: "Innovative tech products and solutions",
      customerCnic: "12345-6789012-3", // CNIC
    },
    {
      customerName: "Jane Smith",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      customerAccount: "298509",
      customerPhone: "929393939",
      customerAddress: "Organic farming and produce",
      customerCnic: "98765-4321098-7", // CNIC
    },
    {
      customerName: "Mike Brown",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      customerAccount: "2578",
      customerPhone: "Contact",
      customerAddress: "Product Manager",
      customerCnic: "54321-0987654-1", // CNIC
    },
  ];
  

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
    navigate(PATH_DASHBOARD.customer.edit);
  };
  const handleAccountRow = (id) => {
    navigate(PATH_DASHBOARD.customer.account);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> customer | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
         links={[
      { name: 'customer', href: PATH_DASHBOARD.root },
      ]}
        action={
    <>  
       {/* New Button: customers Balance Report */}
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }} // Adds some space between the buttons
      >
        customers Balance Report
        
      </Button>
            {/* New Button: customers Balance Report */}
            <Button
        component={RouterLink}
        to={PATH_DASHBOARD.customer.balancemessage}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }} // Adds some space between the buttons
      >
        Send Balance Message
        
      </Button>
            {/* New Button: customers Balance Report */}
            <Button
                component={RouterLink}
                to={PATH_DASHBOARD.customer.areas}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }} // Adds some space between the buttons
      >
        Areas
        
      </Button>
            {/* New Button: customers Balance Report */}
            <Button
          component={RouterLink}
          to={PATH_DASHBOARD.customer.import}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }} // Adds some space between the buttons
      >
        Import
        
      </Button>
            {/* New Button: customers Balance Report */}
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
        }
     />


        <Card>
    
        <CustomerTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={AREA_OPTIONS}
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
      <TableCell>{row.customerName}</TableCell>
        <TableCell>{row.customerPhone}</TableCell>
        <TableCell>{row.customerCnic}</TableCell>
        <TableCell>{row.customerAddress}</TableCell>
        <TableCell>{row.customerAccount}</TableCell>
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
            <CustomersBalanceReport customer={data} />
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
