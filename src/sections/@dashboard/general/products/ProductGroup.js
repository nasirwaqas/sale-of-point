import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
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
import Iconify from '../../../../components/iconify';
import { PATH_DASHBOARD } from '../../../../routes/paths';
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
import { UserTableToolbar } from '../../category/list';
import { GET_PRODUCT_GROUP_BY_BRANCH } from '../../../../graphQL/queries';
import { DELETE_PRODUCT_GROUP } from '../../../../graphQL/mutations';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'groupName', label: 'Name', align: 'left' },
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
  const { enqueueSnackbar } = useSnackbar();
  const { id: paramId } = useParams();

  const [filterName, setFilterName] = useState('');
  const [branchId] = useState('60d0fe4f5311236168a109ca'); // Replace with actual branch ID

  const { loading, error: queryError, data, refetch } = useQuery(GET_PRODUCT_GROUP_BY_BRANCH, {
    variables: { branchId, groupName: filterName },
  });

  const [deleteProductGroup] = useMutation(DELETE_PRODUCT_GROUP, {
    onCompleted: () => {
      enqueueSnackbar('Product group deleted successfully!', { variant: 'success' });
      refetch();
    },
    onError: (mutationError) => {
      enqueueSnackbar(`Error deleting product group: ${mutationError.message}`, { variant: 'error' });
    },
  });

  const dataFiltered = applyFilter({
    inputData: data ? data.getProductGroupByBranch : [],
    filterName,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const handleEditRow = (id) => {
    console.log('Edit ProductGroup ID:', id); // Log the customer ID
    navigate(PATH_DASHBOARD.product.groupedit(id));
  };

  const handleDeleteRow = async (deleteId) => {
    try {
      await deleteProductGroup({ variables: { id: deleteId } });
    } catch (mutationError) {
      console.error('Error deleting product group:', mutationError);
    }
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    refetch({ branchId, groupName: event.target.value });
  };

  const handleResetFilter = () => {
    setFilterName('');
    refetch({ branchId, groupName: '' });
  };

  return (
    <>
      <Helmet>
        <title> Product Group | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[{ name: 'Product Group', href: PATH_DASHBOARD.root }]}
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
                  rowCount={dataFiltered.length}
                  onSort={onSort}
                />
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={2}>Loading...</TableCell>
                    </TableRow>
                  )}
                  {queryError && (
                    <TableRow>
                      <TableCell colSpan={2}>Error: {queryError.message}</TableCell>
                    </TableRow>
                  )}
                  {dataInPage.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.groupName}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEditRow(row.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteRow(row.id)}
                          sx={{ ml: 1 }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
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
    return inputData.filter((group) =>
      group.groupName.toLowerCase().includes(filterName.toLowerCase())
    );
  }
  return inputData;
}