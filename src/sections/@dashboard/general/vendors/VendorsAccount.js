import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, TextField, Select, MenuItem, Button } from '@mui/material';

const VendorAccount = ({ vendorDetails }) => {
  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#fff' }}>
      {/* Vendor Details Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vendor Details
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
          <Table>
            <TableBody>
              {[
                { label: 'Vendor', value: vendorDetails.name },
                { label: 'Email', value: vendorDetails.email },
                { label: 'Phone', value: vendorDetails.phone },
                { label: 'Total Balance', value: vendorDetails.totalBalance },
              ].map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{row.label}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Bottom Border Line */}
      <Box sx={{ height: 2, backgroundColor: '#ddd', my: 3 }}></Box>

      {/* Manage Balance Section */}
      <Box sx={{ mb: 3, p: 2, borderRadius: 1, backgroundColor: '#f7f7f7' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Manage Balance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Balance Type"
              select
              fullWidth
              defaultValue="reduce"
              variant="outlined"
              size="small"
            >
              <MenuItem value="reduce">Reduce</MenuItem>
              <MenuItem value="add">Add</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Border Line */}
      <Box sx={{ height: 2, backgroundColor: '#ddd', my: 3 }}></Box>

      {/* History Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          History
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="From Date"
              type="date"
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="To Date"
              type="date"
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary">
              Search
            </Button>
            <Button variant="outlined" color="primary">
              Print
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VendorAccount;

// Example usage with mock data
VendorAccount.defaultProps = {
  vendorDetails: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    totalBalance: '$5000',
  },
};
