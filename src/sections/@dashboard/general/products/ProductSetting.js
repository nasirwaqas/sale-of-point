import React from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

export default function ProductSetting() {
  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom borderBottom='1px solid #ddd'>
          Settings
        </Typography>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Barcode Settings
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Barcode Show Product Name"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Barcode Show Sale Price"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Barcode Show Title"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Page break after every barcode"
              />
            </Card>
          </Grid>

          {/* Center Column */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Barcode Properties
              </Typography>
              <TextField
                label="Barcode Height"
                defaultValue="40"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Barcode Margin Bottom"
                defaultValue="0"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Barcode Margin Left"
                defaultValue="20"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Barcode Margin Top"
                defaultValue="10"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Barcode Title"
                defaultValue="TARGET P"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Barcode Width"
                defaultValue="3"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Code Title"
                defaultValue="Code/ Bar Code/ SKU/IMEI"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Code2 Title"
                defaultValue="Code (Optional)"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Manufacturer Title"
                defaultValue="Manufacturing/Company (Optional)"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Search Title"
                defaultValue="Keywords, Formula (Optional)"
                fullWidth
                margin="normal"
              />
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Barcode Type
              </Typography>
              <Select
                fullWidth
                defaultValue="code128"
                displayEmpty
                margin="normal"
              >
                <MenuItem value="code128">Code 128</MenuItem>
                <MenuItem value="code39">Code 39</MenuItem>
                <MenuItem value="ean13">EAN 13</MenuItem>
                <MenuItem value="upc">UPC</MenuItem>
              </Select>
            </Card>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box
          sx={{
            mt: 3,
            pt: 3,
            borderTop: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 5 }}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
