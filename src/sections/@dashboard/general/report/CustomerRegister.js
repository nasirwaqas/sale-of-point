import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// components
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';


// ----------------------------------------------------------------------

CustomerRegister.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function CustomerRegister({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'),
    cnic: Yup.string().required('CNIC is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    saleTax: Yup.string().required('Sale Tax is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
    avatarUrl: Yup.mixed().required('Picture is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      phone: currentUser?.phone || '',
      cnic: currentUser?.cnic || '',
      email: currentUser?.email || '',
      saleTax: currentUser?.saleTax || '',
      address: currentUser?.address || '',
      description: currentUser?.description || '',
      avatarUrl: currentUser?.avatarUrl || null,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit, formState } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser, reset, defaultValues]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    navigate(-1);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Customer Information
          </Typography>
          <Card sx={{ p: 3 }}>
            {/* First Row - Dropdown */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <RHFSelect name="category" label="Category">
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
              </RHFSelect>
            </Box>

            {/* Second Row - First Name & Last Name */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mt={2}>
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
            </Box>

            {/* Third Row - Phone, CNIC, Email, Sale Tax */}
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} mt={2}>
              <RHFTextField name="phone" label="Phone" />
              <RHFTextField name="cnic" label="CNIC" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="saleTax" label="Sale Tax" />
            </Box>

            {/* Fourth Row - Address & Description */}
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mt={2}>
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="description" label="Description" multiline rows={3} />
            </Box>

            {/* Fifth Row - Picture */}
            <Box mt={2}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>

            {/* Buttons */}
            <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
              <LoadingButton type="submit" variant="contained" loading={formState.isSubmitting}>
                {isEdit ? 'Save Changes' : 'Save'}
              </LoadingButton>
              <LoadingButton variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
