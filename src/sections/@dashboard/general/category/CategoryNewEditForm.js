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
import { useMutation } from '@apollo/client';

// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// assets
import { parentcategory } from '../../../../assets/data';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { CREATE_CATEGORY, EDIT_CATEGORY } from '../../../../graphQL/mutations';

// ----------------------------------------------------------------------

CategoryNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCategory: PropTypes.object,
};

export default function CategoryNewEditForm({ isEdit = false, currentCategory }) {
  const navigate = useNavigate();
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [editCategory] = useMutation(EDIT_CATEGORY);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    categoryname: Yup.string().required('Category Name is required'),
    parentCategory: Yup.string().required('Parent Category is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      categoryname: currentCategory?.name || '',
      parentCategory: currentCategory?.parent_category || '',
      description: currentCategory?.description || '',
      image: currentCategory?.image || null,
      status: currentCategory?.status || 'active',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCategory]
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

  useEffect(() => {
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);

  // eslint-disable-next-line no-shadow
  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await editCategory({
          variables: {
            editCategoryId: currentCategory.id,
            parentCategory: data.parentCategory,
            name: data.categoryname,
            description: data.description,
            ...(typeof data.image !== 'string' && { image: data.image }),
            status: data?.status,
          },
        });
      } else {
        await createCategory({
          variables: {
            branchId: '6770c752a14170831ad68c75',
            parentCategory: data.parentCategory,
            name: data.categoryname,
            description: data.description,
            image: data.image,
            status: data?.status,
          },
        });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.categories.list);
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
              <RHFSelect native name="parentCategory" label="Parent Category" placeholder="Parent Category">
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
