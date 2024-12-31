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
  TableSkeleton,
} from '../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/category/list';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES_BY_BRANCH } from 'src/graphQL/queries';
import { EDIT_CATEGORY } from 'src/graphQL/mutations';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const TABLE_HEAD = [
  { id: 'categoryName', label: 'Name', align: 'left' },
  { id: 'categoryDescription', label: 'Description', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function GeneralCategoryPage() {
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
  console.log({ tableData });
  const [filterName, setFilterName] = useState('');
  const [editCategory] = useMutation(EDIT_CATEGORY);

  const { data, error, loading, refetch } = useQuery(GET_CATEGORIES_BY_BRANCH, {
    variables: {
      branchId: '6770c752a14170831ad68c75',
      limit: rowsPerPage,
      name: filterName,
      offset: page,
      orderBy: orderBy,
      order: order,
    },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setTableData(data.getCategoriesByBranch);
    },
  });

  const denseHeight = dense ? 52 : 72;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id) => {
    console.log(id);
    navigate(PATH_DASHBOARD.categories.edit(id));
  };
  const handleStatusRow = async (id, status) => {
    await editCategory({
      variables: {
        editCategoryId: id,
        status: status,
      },
    });
    refetch();
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <>
      <Helmet>
        <title> Categories: List | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Categories' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
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
                  rowCount={tableData?.categoryItems?.length}
                  onSort={onSort}
                />

                <TableBody>
                  {!data && loading && <TableSkeleton />}
                  {data &&
                    !loading &&
                    tableData?.categoryItems?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row?.name}</TableCell>
                        <TableCell>{row?.description}</TableCell>
                        <TableCell>
                          <Button variant="outlined" color="primary" size="small" onClick={() => handleEditRow(row.id)}>
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color={ row?.status === 'active' ? 'error' : 'success'}
                            size="small"
                            sx={{ ml: 1 }}
                            onClick={() => handleStatusRow(row.id, row?.status === 'active' ? 'deactive' : 'active')}
                          >
                            {row?.status === 'active' ?  'Deactive' : 'Active' }
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.categoryItems?.length)}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.filterCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
