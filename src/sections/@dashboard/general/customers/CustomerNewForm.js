import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, MenuItem } from '@mui/material';
import { fData } from '../../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { GET_CUSTOMER_AREAS_BY_BRANCH } from '../../../../graphQL/queries';
import { CREATE_CUSTOMER } from '../../../../graphQL/mutations';
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

CustomerNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function CustomerNewForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: customerAreasData } = useQuery(GET_CUSTOMER_AREAS_BY_BRANCH, {
    variables: { branchId: '60d0fe4f5311236168a109ca' }, // Replace with actual Branch ID
  });

  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  const NewUserSchema = Yup.object().shape({
    area: Yup.string().required('Area is required'),
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    phone: Yup.string().required('Phone number is required').matches(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'),
    cnic: Yup.string(),
    saleTex: Yup.string(),
    status: Yup.string().required('Status is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    address: Yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
    description: Yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
    image: Yup.mixed().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      area: currentUser?.area || '',
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      cnic: currentUser?.cnic || '',
      saleTex: currentUser?.saleTex || '',
      status: currentUser?.status || 'active',
      email: currentUser?.email || '',
      address: currentUser?.address || '',
      description: currentUser?.description || '',
      image: currentUser?.avatarUrl || null,
      branchId: '60d0fe4f5311236168a109ca', // Add branchId to default values
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser, reset, defaultValues]);

  const onSubmit = async (data) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        description,
        cnic,
        saleTex,
        image,
        status,
        branchId,
        area, // This will now be the area ID
      } = data;

      const selectedArea = customerAreasData.getCustomerAreasByBranch.find((a) => a.id === area);
      const areaName = selectedArea ? selectedArea.name : '';

      await createCustomer({
        variables: {
          name,
          email,
          phone,
          address,
          description,
          cnic,
          saleTex,
          image,
          status,
          branchId,
          area: areaName, // Pass the area name
          customerAreaId: area, // Pass the area ID
        },
      });

      reset();
      enqueueSnackbar(!isEdit ? 'Customer created successfully!' : 'Customer updated successfully!', { variant: 'success' });
      navigate(PATH_DASHBOARD.customer.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error creating customer', { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={16} md={12}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFSelect name="area" label="Area" id="area">
                {customerAreasData?.getCustomerAreasByBranch.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="name" label="Name" id="name" />
              <RHFTextField name="phone" label="Phone" id="phone" />
              <RHFTextField name="cnic" label="CNIC" id="cnic" />
              <RHFTextField name="saleTex" label="Sale Tex" id="saleTex" />
              <RHFTextField name="email" label="Email" id="email" />
              <RHFTextField name="address" multiline rows={2} label="Address" id="address" />
              <RHFTextField name="description" multiline rows={4} label="Description" id="description" />
              <RHFUploadAvatar
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                id="image"
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
                {!isEdit ? 'Create Customer' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}