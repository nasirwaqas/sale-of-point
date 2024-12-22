import React from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';

export default function ProductSaleHistory() {
  const handleBack = () => {
    // Navigate back (use appropriate navigation logic for your app)
    window.history.back();
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Search clicked');
  };

  const handlePrint = () => {
    // Implement print logic here
    console.log('Print clicked');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Product Sale History</Typography>
        <Button variant="contained" color="secondary" onClick={handleBack}>
          Back
        </Button>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TextField label="User" variant="outlined" size="small" />
        <TextField label="Product" variant="outlined" size="small" />
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          size="small"
  
          InputLabelProps={{ shrink: true }}
        />
        {/* Dropdown Field for Shift */}
        <TextField
          select
          label="Shift"
          variant="outlined"
          size="small"
          sx={{ minWidth: '12vw' }}
        >
          <MenuItem value="Morning">Morning</MenuItem>
          <MenuItem value="Evening">Evening</MenuItem>
          <MenuItem value="Night">Night</MenuItem>
        </TextField>
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          size="small"
         
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="success" onClick={handlePrint}>
          Print
        </Button>
      </Box>
    </Box>
  );
}
