import React from 'react';
import { Button, TextField, MenuItem, Grid } from '@mui/material';

const ExpenseHistory = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Expense History</h2>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Expense Type"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="From Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="To Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} style={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" color="primary" fullWidth>Search</Button>
          <Button variant="outlined" color="secondary" fullWidth>Print</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExpenseHistory;
