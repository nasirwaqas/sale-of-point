import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// @mui
import {
  Grid,
  Card,
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { CREATE_PRODUCT } from '../../../../graphQL/mutations';
import { GET_CATEGORIES_BY_BRANCH } from '../../../../graphQL/queries';
import { fData } from '../../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../../routes/paths'; // Import PATH_DASHBOARD as a named import

ProductNewForm.propTypes = {
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ currentProduct }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);
  const [branchId, setBranchId] = useState('60d0fe4f5311236168a109ca');

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES_BY_BRANCH, {
    variables: { branchId },
  });

  const NewProductSchema = Yup.object().shape({
    skuCode: Yup.string().required('SKU Code is required'),
    code: Yup.string().required('Code is required'),
    name: Yup.string().required('Name is required'),
    category: Yup.string().required('Category is required'),
    company: Yup.string(),
    formula: Yup.string(),
    purchasePrice: Yup.number().required('Purchase Price is required'),
    salePrice: Yup.number().required('Sale Price is required'),
    wholesalePrice: Yup.number(),
    saleQuantities: Yup.number().required('Sale Quantities is required'),
    discountPercentage: Yup.number(),
    discountRs: Yup.number(),
    minimumStock: Yup.number().required('Minimum Stock is required'),
    boxPurchasePrice: Yup.number(),
    boxSalePrice: Yup.number(),
    boxSize: Yup.number(),
    saleMargin: Yup.number(),
    description: Yup.string(),
    location: Yup.string(),
    inStock: Yup.number().required('In Stock is required'),
    addStock: Yup.number().required('Add Stock is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      skuCode: currentProduct?.skuCode || '',
      code: currentProduct?.code || '',
      name: currentProduct?.name || '',
      category: currentProduct?.category || '',
      company: currentProduct?.company || '',
      formula: currentProduct?.formula || '',
      purchasePrice: currentProduct?.purchasePrice || '',
      salePrice: currentProduct?.salePrice || '',
      wholesalePrice: currentProduct?.wholesalePrice || '',
      saleQuantities: currentProduct?.saleQuantities || '',
      discountPercentage: currentProduct?.discountPercentage || '',
      discountRs: currentProduct?.discountRs || '',
      minimumStock: currentProduct?.minimumStock || '',
      boxPurchasePrice: currentProduct?.boxPurchasePrice || '',
      boxSalePrice: currentProduct?.boxSalePrice || '',
      boxSize: currentProduct?.boxSize || '',
      saleMargin: currentProduct?.saleMargin || '',
      description: currentProduct?.description || '',
      location: currentProduct?.location || '',
      inStock: currentProduct?.inStock || '',
      addStock: currentProduct?.addStock || '',
      image: currentProduct?.image || null,
      branchId: '60d0fe4f5311236168a109ca', // Add branchId to default values
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
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
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, reset, defaultValues]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
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

  const handleGenerateCode = () => {
    const generatedCode = Math.floor(Math.random() * 100000000);
    setValue('skuCode', generatedCode);
  };

  const handleCalculatePrice = () => {
    const purchasePrice = parseFloat(values.purchasePrice);
    const marginPercentage = parseFloat(values.saleMargin);
    if (Number.isNaN(purchasePrice) || Number.isNaN(marginPercentage)) {
      console.error('Invalid purchase price or margin percentage');
      return;
    }
    const calculatedSalePrice = purchasePrice + (purchasePrice * marginPercentage) / 100;
    setValue('salePrice', calculatedSalePrice.toFixed(2));
  };

  const handleDiscountPercentChange = (e) => {
    const discountPercent = parseFloat(e.target.value);
    const salePrice = parseFloat(values.salePrice);
    if (Number.isNaN(discountPercent) || Number.isNaN(salePrice)) {
      console.error('Invalid discount percent or sale price');
      setValue('discountRs', '');
      return;
    }
    const discountRs = (salePrice * discountPercent) / 100;
    setValue('discountRs', discountRs.toFixed(2));
  };

  const handleDiscountRsChange = (e) => {
    const discountRs = parseFloat(e.target.value);
    const salePrice = parseFloat(values.salePrice);
    if (Number.isNaN(discountRs) || Number.isNaN(salePrice)) {
      console.error('Invalid discount Rs or sale price');
      setValue('discountPercentage', '');
      return;
    }
    const discountPercent = (discountRs / salePrice) * 100;
    setValue('discountPercentage', discountPercent.toFixed(2));
  };

  const handlePurchasePriceChange = (e) => {
    const purchasePrice = e.target.value;
    setValue('purchasePrice', purchasePrice);
    if (purchasePrice === '') {
      setValue('salePrice', '');
    } else {
      const parsedPurchasePrice = parseFloat(purchasePrice);
      if (!Number.isNaN(parsedPurchasePrice)) {
        setValue('salePrice', parsedPurchasePrice.toFixed(2));
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const input = {
        branchId, // Ensure branchId is included in the input data
        status: data.status,
        skuCode: data.skuCode,
        code: data.code,
        name: data.name,
        category: data.category,
        company: data.company,
        formula: data.formula,
        purchasePrice: parseFloat(data.purchasePrice),
        salePrice: parseFloat(data.salePrice),
        wholesalePrice: parseFloat(data.wholesalePrice),
        saleQuantities: parseInt(data.saleQuantities, 10), // Added radix parameter
        discountPercentage: parseFloat(data.discountPercentage) || 0, // Corrected field name and added default value
        discountRs: parseFloat(data.discountRs) || 0, // Added default value
        minimumStock: parseInt(data.minimumStock, 10), // Added radix parameter
        boxPurchasePrice: parseFloat(data.boxPurchasePrice),
        boxSalePrice: parseFloat(data.boxSalePrice),
        boxSize: parseInt(data.boxSize, 10), // Added radix parameter
        saleMargin: parseFloat(data.saleMargin),
        description: data.description,
        location: data.location,
        inStock: parseInt(data.inStock, 10), // Added radix parameter
        addStock: parseInt(data.addStock, 10), // Added radix parameter
        image: data.image,
      };

      // Log the input data to debug
      console.log('Submitting input:', input);

      const response = await createProduct({ variables: { input } });
      console.log('Response:', response); // Log the response

      enqueueSnackbar('Product created successfully', { variant: 'success' });
      navigate(PATH_DASHBOARD.product.root); // Navigate to the product list page
    } catch (err) {
      console.error('Error creating product:', err);
      enqueueSnackbar('Error creating product', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* Import Button on Top-Right */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Import
        </Button>
      </Box>

      {/* Modal for Importing Products */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Card
          sx={{
            p: 4,
            width: 400,
            margin: 'auto',
            mt: '10%',
            boxShadow: 24,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Import Products From Excel
          </Typography>
          <Button variant="outlined" component="label" sx={{ mt: 3 }}>
            Choose File
            <input type="file" accept="image/*" hidden onChange={handleFileUpload} />
          </Button>
          {uploadedFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {uploadedFile.name}
            </Typography>
          )}
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => console.log('File uploaded')}>
              Upload
            </Button>
          </Stack>
        </Card>
      </Modal>

      <Grid container spacing={3}>
        {/* Product Form Fields */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Product Details
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
              gap={2}
            >
              {/* Code Field with Generate Button */}
              <Box display="flex" gap={2}>
                <RHFTextField name="skuCode" label="Code / Barcode / SKU / IMEI" />
                <Button
                  variant="outlined"
                  onClick={handleGenerateCode}
                >
                  Generate
                </Button>
              </Box>

              {/* Additional Fields */}
              <RHFTextField name="code" label="Code (Optional)" />
              <RHFTextField name="name" label="Name" />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Category">
                      {categoryLoading && <MenuItem disabled><CircularProgress size={24} /></MenuItem>}
                      {categoryError && <MenuItem disabled>Error loading categories</MenuItem>}
                      {categoryData?.getCategoriesByBranch?.categoryItems.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <RHFTextField name="company" label="Manufacturer/Company (Optional)" />
              <RHFTextField name="formula" label="Keyword/Formula(Optional)" />
              <RHFTextField
                name="purchasePrice"
                label="Purchase Price"
                onChange={handlePurchasePriceChange}
                value={values.purchasePrice}
              />
              <Box display="flex" gap={2}>
                <RHFTextField name="salePrice" label="Sale Price" />
                <Button
                  variant="outlined"
                  onClick={handleCalculatePrice}
                >
                  Calculate Price
                </Button>
              </Box>
              <RHFTextField name="wholesalePrice" label="Wholesale Sale Price" />
              <RHFTextField name="saleQuantities" label="Sale Default Quantities" />
              <Box display="flex" gap={2}>
                <RHFTextField
                  name="discountPercentage"
                  label="Discount (%)"
                  onChange={(e) => {
                    setValue('discountPercentage', e.target.value);
                    handleDiscountPercentChange(e);
                  }}
                />
                <RHFTextField
                  name="discountRs"
                  label="Discount (Rs)"
                  onChange={(e) => {
                    setValue('discountRs', e.target.value);
                    handleDiscountRsChange(e);
                  }}
                />
              </Box>
              <RHFTextField name="minimumStock" label="Minimum Stock (Low Notification)" />
              <RHFTextField name="boxPurchasePrice" label="Box Purchase Price" />
              <RHFTextField name="boxSalePrice" label="Box Sale Price" />
              <RHFTextField name="boxSize" label="Box Size (Quantities in One Box)" />
              <RHFTextField name="saleMargin" label="Sale Margin (%)" />
              <RHFTextField name="description" label="Description" multiline rows={3} />
              <RHFTextField name="location" label="Location" />
              <RHFTextField name="inStock" label="In Stock" />
              <RHFTextField name="addStock" label="Add New Stock" />
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

            {/* Actions */}
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Button variant="outlined" onClick={() => navigate(PATH_DASHBOARD.product.root)}>Cancel</Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}