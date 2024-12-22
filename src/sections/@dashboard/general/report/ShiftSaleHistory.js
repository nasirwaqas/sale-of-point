import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function ShiftSaleHistory() {
  const [shift, setShift] = useState('');
  const shiftOptions = ["Shift A", "Shift B", "Shift C", "Shift D"];

  const handleSearch = () => {
    console.log('Search clicked for shift:', shift);
  };

  const handlePrint = () => {
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
        <Typography variant="h4">Shift Sale History</Typography>
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
        <FormControl sx={{ minWidth: '20vw' }} size="small">
          <InputLabel>Shift</InputLabel>
          <Select
            value={shift}
            onChange={(event) => setShift(event.target.value)}
            label="Shift"
          >
            {shiftOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
