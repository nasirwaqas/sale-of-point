import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
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
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { UserTableToolbar } from '../../sections/@dashboard/category/list';
import { GET_MANUFACTURES_BY_BRANCH } from '../../graphQL/queries';
import { EDIT_MANUFACTURE } from '../../graphQL/mutations';
import {
  useTable,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from '../../components/table';

// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function GeneralManufacturePage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
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
  const [editManufacture] = useMutation(EDIT_MANUFACTURE);

  const { data, error, loading, refetch } = useQuery(GET_MANUFACTURES_BY_BRANCH, {
    variables: {
      branchId: '6770c752a14170831ad68c75',
      limit: rowsPerPage,
      name: filterName,
      offset: page,
      orderBy,
      order,
    },
    fetchPolicy: 'no-cache',
    // eslint-disable-next-line no-shadow
    onCompleted: (data) => {
      setTableData(data.getManufacturesByBranch);
    },
  });

  const denseHeight = dense ? 52 : 72;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEditRow = (id) => {
    console.log(id);
    navigate(PATH_DASHBOARD.manufacture.edit(id));
  };
  const handleStatusRow = async (id, status) => {
    await editManufacture({
      variables: {
        editManufactureId: id,
        status,
      },
    });
    refetch();
  };

  return (
    <>
      <Helmet>
        <title> Manufactures: List | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Manufactures' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.manufacture.new}
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
                  rowCount={tableData?.Items?.length}
                  onSort={onSort}
                />

                <TableBody>
                  {!data && loading && <TableSkeleton />}
                  {data &&
                    !loading &&
                    tableData?.Items?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row?.name}</TableCell>
                        <TableCell>{row?.phone}</TableCell>
                        <TableCell>{row?.email}</TableCell>
                        <TableCell>{row?.address}</TableCell>
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
                            color={row?.status === 'active' ? 'error' : 'success'}
                            size="small"
                            sx={{ ml: 1 }}
                            onClick={() =>
                              handleStatusRow(
                                row.id,
                                row?.status === 'active' ? 'deactive' : 'active'
                              )
                            }
                          >
                            {row?.status === 'active' ? 'Deactive' : 'Active'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.Items?.length)}
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
