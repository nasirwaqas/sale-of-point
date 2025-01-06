import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Container,
  FormControlLabel,
  Switch,
  Card,
} from '@mui/material';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EXPENSE_TYPE, DELETE_EXPENSE_TYPE } from '../../../../graphQL/mutations';
import { GET_EXPENSE_TYPES_BY_BRANCH } from '../../../../graphQL/queries';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from '../../../../components/table';
import Scrollbar from '../../../../components/scrollbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';


const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

const ExpenseTypes = () => {
  const { themeStretch } = useSettingsContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  const { data, loading, error: queryError, refetch } = useQuery(GET_EXPENSE_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75', limit: rowsPerPage, offset: page * rowsPerPage, orderBy, order },
  });

  const [createExpenseType] = useMutation(CREATE_EXPENSE_TYPE, {
    onCompleted: () => {
      setShowForm(false);
      setName('');
      setDescription('');
      setErrors({});
      refetch();
      enqueueSnackbar('Expense type created successfully!', { variant: 'success' });
    },
    onError: (mutationError) => {
      console.error('Error creating expense type:', mutationError);
      enqueueSnackbar(`Error creating expense type: ${mutationError.message}`, { variant: 'error' });
    },
  });

  const [deleteExpenseType] = useMutation(DELETE_EXPENSE_TYPE, {
    onCompleted: () => {
      refetch();
      enqueueSnackbar('Expense type deleted successfully!', { variant: 'success' });
    },
    onError: (mutationError) => {
      console.error('Error deleting expense type:', mutationError);
      enqueueSnackbar(`Error deleting expense type: ${mutationError.message}`, { variant: 'error' });
    },
  });

  const handleShowForm = () => {
    setShowForm(true);
    setName('');
    setDescription('');
  };

  const handleHideForm = () => {
    setShowForm(false);
    setErrors({});
  };

  const handleEdit = (id) => {
    if (!id) {
      console.error('Invalid ID:', id); // Debugging log
      return;
    }
    console.log('Editing expense type with ID:', id);
    navigate(PATH_DASHBOARD.expense.edit(id));
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error('Invalid ID for deletion:', id);
      return;
    }
    deleteExpenseType({ variables: { id } });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate({ name, description }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      createExpenseType({ variables: { branchId: '6770c752a14170831ad68c75', name, description } });
    }
  };

  const denseHeight = dense ? 52 : 72;

  if (loading) return <p>Loading...</p>;
  if (queryError) {
    console.error('Error loading expense types:', queryError);
    return <p>Error loading expense types: {queryError.message}</p>;
  }

  return (
    <>
      <Helmet>
        <title>Expense Types | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Expense Types"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Expense', href: PATH_DASHBOARD.root.expense },
            { name: 'Types' },
          ]}
        />
      </Container>

      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end', // Align to the end of the right side
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleShowForm}>
            New
          </Button>
        </div>

        {showForm && (
          <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Expense Types Information
            </h3>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                style={{ marginBottom: '20px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleHideForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Paper>
        )}

        <Card>
          <TableContainer component={Paper}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data?.getExpenseTypesByBranch?.length || 0}
                  onSort={onSort}
                />
                <TableBody>
                  {!data && loading && <TableSkeleton />}
                  {data &&
                    !loading &&
                    data.getExpenseTypesByBranch
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((expenseType) => (
                        <TableRow key={expenseType.id}>
                          <TableCell>{expenseType.name}</TableCell>
                          <TableCell>{expenseType.description}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => handleEdit(expenseType.id)}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              onClick={() => handleDelete(expenseType.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, data?.getExpenseTypesByBranch?.length || 0)}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={data?.getExpenseTypesByBranch?.length || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </div>
    </>
  );
};

export default ExpenseTypes;