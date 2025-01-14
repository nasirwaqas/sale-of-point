import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Button, TextField, Container, Paper } from '@mui/material';
import { useSnackbar } from '../../../../components/snackbar';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { EDIT_VENDOR } from '../../../../graphQL/mutations';
import { GET_VENDOR_BY_ID } from '../../../../graphQL/queries';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const VendorsEditForm = ({ isEdit = false, currentUser }) => {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [mutationError, setMutationError] = useState(null); // State for mutation error
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error: queryError } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id },
  });

  const [editVendor] = useMutation(EDIT_VENDOR, {
    onCompleted: () => {
      enqueueSnackbar('Vendor updated successfully!', { variant: 'success' });
      navigate(PATH_DASHBOARD.general.vendors);
    },
    onError: (error) => {
      console.error('Error editing vendor:', error);
      setMutationError(error); // Set mutation error state
      enqueueSnackbar(`Error editing vendor: ${error.message}`, { variant: 'error' });
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.getVendorById.name);
      setPhone(data.getVendorById.phone);
      setAddress(data.getVendorById.address);
      setEmail(data.getVendorById.email);
      setDescription(data.getVendorById.description);
    }
  }, [data]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required').matches(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'),
    address: Yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate({ name, phone, address, email, description }, { abortEarly: false });
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
      console.log('Submitting data:', { id, name, phone, address, email, description });

      try {
        await editVendor({
          variables: {
            id,
            name,
            phone,
            address,
            email,
            description,
          },
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (queryError) {
    console.error('Error loading vendor:', queryError);
    return <p>Error loading vendor: {queryError.message}</p>;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Vendor"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vendors', href: PATH_DASHBOARD.general.vendors },
            { name: 'Edit Vendor' },
          ]}
        />
      </Container>

      <div style={{ padding: '20px' }}>
        <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Vendor</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
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
                onClick={() => navigate(PATH_DASHBOARD.general.vendors)}
              >
                Cancel
              </Button>
            </div>
            {mutationError && (
              <p style={{ color: 'red', marginTop: '20px' }}>
                Error editing vendor: {mutationError.message}
              </p>
            )}
          </form>
        </Paper>
      </div>
    </>
  );
};

VendorsEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default VendorsEditForm;
