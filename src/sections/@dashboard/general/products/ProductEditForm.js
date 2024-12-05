
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from '../../../../components/hook-form';

ProductEditForm.propTypes = {
  currentProduct: PropTypes.object,
};

export default function ProductEditForm({ currentProduct }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleGenerateCode = (setValue) => {
    const generatedCode = Math.floor(Math.random() * 100000000);
    setValue('code', generatedCode);
  };

  const handleCalculatePrice = (purchasePrice, setValue) => {
    const marginPercentage = 20; // Example: 20% margin
    const calculatedSalePrice = purchasePrice + (purchasePrice * marginPercentage) / 100;
    setValue('salePrice', calculatedSalePrice.toFixed(2));
  };

  const defaultValues = {
    code: currentProduct?.code || '29286672',
    name: currentProduct?.name || '',
    category: currentProduct?.category || '',
    manufacturer: currentProduct?.manufacturer || '',
    formula: currentProduct?.formula || '',
    keywords: currentProduct?.keywords || '',
    purchasePrice: currentProduct?.purchasePrice || 0,
    salePrice: currentProduct?.salePrice || 0,
    wholesalePrice: currentProduct?.wholesalePrice || 0,
    saleQuantities: currentProduct?.saleQuantities || 0,
    saleDiscountPercent: 0,
    saleDiscountRs: 0,
    minimumStock: currentProduct?.minimumStock || 0,
    boxPurchasePrice: currentProduct?.boxPurchasePrice || 0,
    boxSalePrice: currentProduct?.boxSalePrice || 0,
    boxSize: currentProduct?.boxSize || 0,
    saleMargin: currentProduct?.saleMargin || 0,
    inStock: currentProduct?.inStock || 0,
    addNewStock: currentProduct?.addNewStock || 0,
    description: currentProduct?.description || '',
    location: currentProduct?.location || '',
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, setValue, watch, formState } = methods;

  const purchasePrice = watch('purchasePrice');

  const onSubmit = async (data) => {
    console.log('Submitted Data:', data);
    // Perform save action
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
            <input type="file" hidden onChange={handleFileUpload} />
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
                <RHFTextField name="code" label="Code / Barcode / SKU / IMEI" />
                <Button
                  variant="outlined"
                  onClick={() => handleGenerateCode(setValue)}
                >
                  Generate
                </Button>
              </Box>

              {/* Additional Fields */}
              <RHFTextField name="codeOptional" label="Code (Optional)" />
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="category" label="Category" />
              <RHFTextField name="manufacturer" label="Manufacturer/Company (Optional)" />
              <RHFTextField name="keywordformula" label="Keyword/Formula(Optional)" />
              <RHFTextField name="purchasePrice" label="Purchase Price" />
              <Box display="flex" gap={2}>
                <RHFTextField name="salePrice" label="Sale Price" />
                <Button
                  variant="outlined"
                  onClick={() => handleCalculatePrice(purchasePrice, setValue)}
                >
                  Calculate Price
                </Button>
              </Box>
              <RHFTextField name="wholesalePrice" label="Wholesale Sale Price" />
              <RHFTextField name="saleQuantities" label="Sale Default Quantities" />
              <Box display="flex" gap={2}>
                <RHFTextField name="saleDiscountPercent" label="Discount (%)" />
                <RHFTextField name="saleDiscountRs" label="Discount (Rs)" />
              </Box>
              <RHFTextField name="minimumStock" label="Minimum Stock (Low Notification)" />
              <RHFTextField name="boxPurchasePrice" label="Box Purchase Price" />
              <RHFTextField name="boxSalePrice" label="Box Sale Price" />
              <RHFTextField name="boxSize" label="Box Size (Quantities in One Box)" />
              <RHFTextField name="saleMargin" label="Sale Margin (%)" />
              <RHFTextField name="description" label="Description" multiline rows={3} />
              <RHFTextField name="location" label="Location" />
            </Box>

            {/* Separator Line */}
            <Divider sx={{ my: 3 }} />

            {/* Additional Fields After Line */}
            <Box display="flex" gap={2}>
              <RHFTextField name="inStock" label="In Stock" />
              <RHFTextField name="addNewStock" label="Add New Stock" />
            </Box>

            {/* File Upload */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Upload Picture
            </Typography>
            <Button variant="outlined" component="label">
              Choose File
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {uploadedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected File: {uploadedFile.name}
              </Typography>
            )}

            {/* Actions */}
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Button variant="outlined">Cancel</Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={formState.isSubmitting}
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
