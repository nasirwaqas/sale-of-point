import React from 'react';
import { useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../../components/snackbar';
import { CREATE_VENDOR } from '../../../../graphQL/mutations';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  description: Yup.string().required('Description is required'),
});

const VendorsNewForm = () => {
  const branchId = '6770c752a14170831ad68c75'; // Hardcoded branch ID
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [createVendor, { loading, error: mutationError }] = useMutation(CREATE_VENDOR, {
    onCompleted: (data) => {
      enqueueSnackbar('Vendor created successfully!', { variant: 'success' });
      navigate(PATH_DASHBOARD.general.vendors);
    },
    onError: (err) => {
      enqueueSnackbar(`Error creating vendor: ${err.message}`, { variant: 'error' });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      email: '',
      description: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await createVendor({
        variables: {
          branchId,
          ...data,
        },
      });
      reset(); // Reset form after successful submission
    } catch (err) {
      console.error('Error creating vendor:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Create New Vendor
      </Typography>

      {/* Inline Inputs: Name and Phone */}
      <Box display="flex" gap={2} marginBottom={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ''}
            />
          )}
        />
      </Box>

      {/* Inline Inputs: Address and Email */}
      <Box display="flex" gap={2} marginBottom={2}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ''}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          )}
        />
      </Box>

      {/* Full-line Input: Description */}
      <Box marginBottom={2}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          )}
        />
      </Box>

      {/* Submit Button */}
      <Box display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>

      {/* Error Message */}
      {mutationError && (
        <Typography color="error" style={{ marginTop: '16px' }}>
          {mutationError.message}
        </Typography>
      )}
    </form>
  );
};

export default VendorsNewForm;
