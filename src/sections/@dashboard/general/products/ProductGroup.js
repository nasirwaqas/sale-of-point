import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/iconify';
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
} from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import {
  useTable,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../../components/table';
import { UserTableToolbar } from '../../../@dashboard/category/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'productGroupName', label: 'Name', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function ProductGroup() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const data = [
    { productGroupName: 'John Doe',  },
    { productGroupName: 'Jane Smith', },
    { productGroupName: 'Mike Brown',  },
  ];

  const dataFiltered = applyFilter({
    inputData: data,
    filterName,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.product.groupedit);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <>
      <Helmet>
        <title> Product Group | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
          
          links={[
            { name: 'Product Group New', href: PATH_DASHBOARD.root },
           
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.product.groupnew}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New 
            </Button>
          }
        />

        <Card>
          {/* Table Toolbar with Search */}
          <UserTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  onSort={onSort}
                />
                <TableBody>
                  {dataInPage.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.productGroupName}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditRow(row.productGroupName)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, data.length)}
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
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filterName }) {
  if (filterName) {
    return inputData.filter((user) =>
      user.menufacturerName.toLowerCase().includes(filterName.toLowerCase())
    );
  }
  return inputData;
}
