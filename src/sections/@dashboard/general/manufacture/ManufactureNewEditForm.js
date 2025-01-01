import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { fData } from '../../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { CREATE_MANUFACTURE, EDIT_MANUFACTURE } from '../../../../graphQL/mutations';

// ----------------------------------------------------------------------

ManufactureNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentManufacture: PropTypes.object,
};

export default function ManufactureNewEditForm({ isEdit = false, currentManufacture }) {
  const navigate = useNavigate();
  const [createManufacture] = useMutation(CREATE_MANUFACTURE);
  const [editManufacture] = useMutation(EDIT_MANUFACTURE);
  const { enqueueSnackbar } = useSnackbar();

  const NewManufactureSchema = Yup.object().shape({
    name: Yup.string().required('Manufacture Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentManufacture?.name || '',
      email: currentManufacture?.email || '',
      phone: currentManufacture?.phone || '',
      address: currentManufacture?.address || '',
      description: currentManufacture?.description || '',
      image: currentManufacture?.image || null,
      status: currentManufacture?.status || 'active',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentManufacture]
  );

  const methods = useForm({
    resolver: yupResolver(NewManufactureSchema),
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

  useEffect(() => {
    if (isEdit && currentManufacture) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentManufacture]);

  // eslint-disable-next-line no-shadow
  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await editManufacture({
          variables: {
            id: currentManufacture.id,
            manufactureInput: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              description: data.description,
              ...(typeof data.image !== 'string' && { image: data.image }),
              status: data?.status,
            },
          },
        });
      } else {
        await createManufacture({
          variables: {
            manufactureInput: {
              branchId: '6770c752a14170831ad68c75',
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              description: data.description,
              image: data.image,
              status: data?.status,
            },
          },
        });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.manufacture.root);
      // eslint-disable-next-line no-shadow
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
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phone" label="Phone" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="description" multiline rows={4} label="Description" />
            </Box>
            <Stack spacing={3} alignItems="center" sx={{ mt: 3 }}>
              <Box sx={{ mb: 5 }}>
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
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Manufacture' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
