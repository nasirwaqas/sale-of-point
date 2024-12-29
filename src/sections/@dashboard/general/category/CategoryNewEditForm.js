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
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from 'src/graphQL/mutations';

// ----------------------------------------------------------------------

CategoryNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function CategoryNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();
  const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    categoryname: Yup.string().required('Category Name is required'),
    parentCategory: Yup.string().required('Parent Category is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      categoryname: currentUser?.categoryname || '',

      parentCategory: currentUser?.parentCategory || '',

      description: currentUser?.description || '',

      image: currentUser?.image || null,
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
      await createCategory({
        variables: {
          branchId: '6770c752a14170831ad68c75',
          parentCategory: data.parentCategory,
          name: data.categoryname,
          description: data.description,
          image: data.image,
          status: 'active',
        },
      });
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
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
              <RHFSelect
                native
                name="parentCategory"
                label="Parent Category"
                placeholder="Parent Category"
              >
                <option value="" />
                {parentcategory.map((parentCategory) => (
                  <option key={parentCategory.code} value={parentCategory.label}>
                    {parentCategory.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="categoryname" label="Category Name" />{' '}
              <RHFTextField name="description" multiline rows={4} label="Discription" />
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
                {!isEdit ? 'Create Category' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
