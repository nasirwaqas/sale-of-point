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
  TableRow, TableCell ,

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
  { id: 'menufacturerName', label: 'Name', align: 'left' },
  { id: 'menufactorerPhone', label: 'Phone', align: 'left' },
  { id: 'menufactorerEmail', label: 'Email', align: 'left' },
  { id: 'menufactorerAdddress', label: 'Address', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },

];

// ----------------------------------------------------------------------

export default function MenufacturerPage() {
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
  const data= [
    {
      menufacturerName: "John Doe",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      menufacturerEmail: "menufcturer@gmail.com",
      role: "Software Engineer",
      isVerified: true,
      status: "Active",
      menufacturerName: "Technology",
      menufacturerAddress: "Innovative tech products and solutions",
      menufacturerPhone: "9230393839",
    },
    {
      menufacturerName: "Jane Smith",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      menufacturerPhone: "929393939",
      menufacturerEmail: "menu@gmail.com",
      menufacturerAddress: "Organic farming and produce",
      categoryAction: "Explore",
    },
    {
        menufacturerName: "Mike Brown",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      menufacturerEmail: "Health@gmial.com",
      menufacturerAddress: "Product Manager",
      categoryDescription: "Health and wellness products",
      menufacturerPhone: "Contact",
    },
]
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
    navigate(PATH_DASHBOARD.menufacturer.edit);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> Menufacturer | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          
          links={[
            { name: 'Menufacturer', href: PATH_DASHBOARD.root },
           
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.menufacturer.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New 
            </Button>
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
      <TableCell>{row.menufacturerName}</TableCell>
      <TableCell>{row.menufacturerEmail}</TableCell>
      <TableCell>{row.menufacturerPhone}</TableCell>
      <TableCell>{row.menufacturerAddress}</TableCell>
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
