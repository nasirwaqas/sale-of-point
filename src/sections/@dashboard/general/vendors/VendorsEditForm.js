import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// assets
import { parentcategory } from '../../../../assets/data';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

VendorsEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function VendorsEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    // Field validations
    vendorName: Yup.string()
      .required('Vender Name is required')
      .min(3, 'Vender Name must be at least 3 characters'),

    vendorPhone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10,15}$/, 'Phone number must be 10 to 15 digits'),

    vendorAddress: Yup.string()
      .required('Address is required')
      .min(10, 'Address must be at least 10 characters'),

    vendorEmail: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),

    vendorDiscription: Yup.string()
      .required('Description is required')
      .min(20, 'Description must be at least 20 characters'),
    discription: Yup.string().required('Description is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
  });


  const defaultValues = useMemo(
    () => ({
      vendorName: currentUser?.vendorName || '',
      vendorAddress: currentUser?.vendorAddress || '',
      vendorEmail: currentUser?.vendorEmail || '',

      vendorPhone: currentUser?.vendorPhone || '',

      vendorDiscription: currentUser?.vendorDiscription || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,


    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" gutterBottom>
            Vendor Information
          </Typography>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >


              <RHFTextField name="vendorName" label="Full Name" />
              <RHFTextField name="vendorPhone" label="Phone" />
              <RHFTextField name="vendorAddress" multiline rows={2} label="Address" />
              <RHFTextField name="vendorEmail" label="Email" />

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

                <RHFTextField name="vendorDiscription" multiline rows={4} label="Discription" />
              </Stack>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center" // Center the buttons horizontally
              sx={{ mt: 3 }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? 'Save' : 'Save Changes'}
              </LoadingButton>
              <LoadingButton
                variant="outlined"
                onClick={() => navigate(-1)} // Go back to the previous page
              >
                Cancel
              </LoadingButton>
            </Stack>


          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
