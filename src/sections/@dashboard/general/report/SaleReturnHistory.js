import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../routes/paths';


export default function SaleReturnHistory() {

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
        <Typography variant="h4">Sale Return History</Typography>
        <Button
                component={RouterLink}
                to={PATH_DASHBOARD.purchase.order}
        variant="contained" color="secondary" >
          Sale Return
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
        
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          size="small"
          sx={{ minWidth: '20vw' }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          size="small"
          sx={{ minWidth: '20vw' }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
}
