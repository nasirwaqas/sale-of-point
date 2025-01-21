import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, MenuItem } from '@mui/material';
import { fData } from '../../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { GET_CUSTOMER_BY_ID, GET_CUSTOMER_AREAS_BY_BRANCH } from '../../../../graphQL/queries';
import { EDIT_CUSTOMER } from '../../../../graphQL/mutations';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';

CustomerEditForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default function CustomerEditForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const branchId = '60d0fe4f5311236168a109ca'; // Static or dynamic branch ID

  // Fetch customer data by ID
  const { data: customerData, loading: customerLoading, error: customerError } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { id },
  });

  // Fetch customer areas by branch
  const { data: customerAreasData, loading: areasLoading, error: areasError } = useQuery(GET_CUSTOMER_AREAS_BY_BRANCH, {
    variables: { branchId },
  });

  const [editCustomer] = useMutation(EDIT_CUSTOMER);

  const NewUserSchema = Yup.object().shape({
    area: Yup.string().required('Area is required'),
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    phone: Yup.string().required('Phone number is required').matches(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'),
    cnic: Yup.string(),
    saleTex: Yup.string(),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    address: Yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
    description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
    image: Yup.mixed().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      area: customerData?.getCustomerById.area || '',
      name: customerData?.getCustomerById.name || '',
      phone: customerData?.getCustomerById.phone || '',
      cnic: customerData?.getCustomerById.cnic || '',
      saleTex: customerData?.getCustomerById.saleTex || '',
      email: customerData?.getCustomerById.email || '',
      address: customerData?.getCustomerById.address || '',
      description: customerData?.getCustomerById.description || '',
      image: customerData?.getCustomerById.image || null,
    }),
    [customerData]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (customerData) {
      reset(defaultValues);
    }
  }, [customerData, reset, defaultValues]);

  const onSubmit = async (formData) => {
    try {
      console.log('Submitting data:', formData); // Log the form data to check the structure
      await editCustomer({
        variables: {
          id, // Pass ID directly
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          cnic: formData.cnic,
          description: formData.description,
          saleTex: formData.saleTex,
          image: formData.image, // Handle file upload properly
          status: formData.status,
          branchId: formData.branchId,
          area: formData.area,
          customerAreaId: formData.customerAreaId
        },
      });

      enqueueSnackbar('Customer updated successfully!', { variant: 'success' });
      navigate(PATH_DASHBOARD.customer.root);
    } catch (error) {
      console.error('Error updating customer:', error);
      enqueueSnackbar('Error updating customer', { variant: 'error' });
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (file) {
      setValue('image', newFile, { shouldValidate: true });
    }
  };

  if (customerLoading || areasLoading) return <p>Loading...</p>;
  if (customerError || areasError) {
    console.error('Error loading data:', customerError || areasError);
    return <p>Error loading data: {(customerError || areasError).message}</p>;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* RHFSelect for Areas */}
              <RHFSelect name="area" label="Area" id="area">
                {customerAreasData?.getCustomerAreasByBranch.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>
                ))}
              </RHFSelect>

              {/* Other input fields */}
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="phone" label="Phone" />
              <RHFTextField name="cnic" label="CNIC" />
              <RHFTextField name="saleTex" label="Sale Tex" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="address" multiline rows={2} label="Address" />
              <RHFTextField name="description" multiline rows={4} label="Description" />
              <RHFUploadAvatar
                name="image"
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
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
