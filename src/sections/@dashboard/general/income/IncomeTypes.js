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
} from '@mui/material';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_INCOME_TYPE, DELETE_INCOME_TYPE } from '../../../../graphQL/mutations';
import { GET_INCOME_TYPES_BY_BRANCH } from '../../../../graphQL/queries';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const IncomeTypes = () => {
  const { themeStretch } = useSettingsContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { data, loading, error: queryError, refetch } = useQuery(GET_INCOME_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75' },
  });

  const [createIncomeType] = useMutation(CREATE_INCOME_TYPE, {
    onCompleted: () => {
      setShowForm(false);
      setName('');
      setDescription('');
      setErrors({});
      refetch();
    },
    onError: (mutationError) => {
      console.error('Error creating income type:', mutationError);
    },
  });

  const [deleteIncomeType] = useMutation(DELETE_INCOME_TYPE, {
    onCompleted: () => {
      refetch();
    },
    onError: (mutationError) => {
      console.error('Error deleting income type:', mutationError);
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
    console.log('Editing income type with ID:', id);
    navigate(PATH_DASHBOARD.income.edit(id));
  };
  
  
  const handleDelete = (id) => {
    if (!id) {
      console.error('Invalid ID for deletion:', id);
      return;
    }
    deleteIncomeType({ variables: { id } });
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
      createIncomeType({ variables: { branchId: '6770c752a14170831ad68c75', name, description } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (queryError) {
    console.error('Error loading income types:', queryError);
    return <p>Error loading income types: {queryError.message}</p>;
  }

  return (
    <>
      <Helmet>
        <title>Income Types | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Income Types"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Income', href: PATH_DASHBOARD.root.income },
            { name: 'Income Types' },
          ]}
        />
      </Container>

      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
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
              Income Types Information
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getIncomeTypesByBranch?.length > 0 ? (
                data.getIncomeTypesByBranch.map((incomeType) => (
                  <TableRow key={incomeType.id}>
                    <TableCell>{incomeType.name}</TableCell>
                    <TableCell>{incomeType.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(incomeType.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(incomeType.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No income types found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default IncomeTypes;