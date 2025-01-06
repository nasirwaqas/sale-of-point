import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';

import { Button, TextField, Container, Paper } from '@mui/material';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { EDIT_INCOME_TYPE } from '../../../../graphQL/mutations';
import { GET_INCOME_TYPE_BY_ID } from '../../../../graphQL/queries';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const IncomeTypeEdit = () => {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [mutationError, setMutationError] = useState(null); // State for mutation error

  const { data, loading, error: queryError } = useQuery(GET_INCOME_TYPE_BY_ID, {
    variables: { id },
  });

  const [editIncomeType] = useMutation(EDIT_INCOME_TYPE, {
    onCompleted: () => {
      navigate(PATH_DASHBOARD.income.types);
    },
    onError: (error) => {
      console.error('Error editing income type:', error);
      setMutationError(error); // Set mutation error state
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.getIncomeTypeById.name);
      setDescription(data.getIncomeTypeById.description);
    }
  }, [data]);

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
      console.log('Submitting data:', { id, name, description });

      try {
        await editIncomeType({
          variables: {
            id,
            name,
            description: description || '', // If description is empty, send an empty string instead of null.
          },
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (queryError) {
    console.error('Error loading income type:', queryError);
    return <p>Error loading income type: {queryError.message}</p>;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Income Type"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Income', href: PATH_DASHBOARD.root.income },
            { name: 'Income Types', href: PATH_DASHBOARD.income.types },
            { name: 'Edit Income Type' },
          ]}
        />
      </Container>

      <div style={{ padding: '20px' }}>
        <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Income Type</h3>
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(PATH_DASHBOARD.income.types)}
              >
                Cancel
              </Button>
            </div>
            {mutationError && (
              <p style={{ color: 'red', marginTop: '20px' }}>
                Error editing income type: {mutationError.message}
              </p>
            )}
          </form>
        </Paper>
      </div>
    </>
  );
};

export default IncomeTypeEdit;
