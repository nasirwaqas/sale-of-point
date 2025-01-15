import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';

import { PATH_DASHBOARD } from '../../../../routes/paths';
import CustomerSendMessage from './CustomerSendMessage';

const CustomerAccount = ({ customerDetails }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  const handleMessage = () => {
    navigate(PATH_DASHBOARD.customer.message);
  };

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#fff' }}>
      {/* Customer Details Section */}
      <Box sx={{ mb: 3, position: 'relative' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Customer Details
        </Typography>

        {/* Buttons in Top Right */}
        <Box sx={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" size="small" onClick={handleMessage}>
            Send Message
          </Button>
          <Button variant="outlined" color="primary" size="small" onClick={handleBackClick}>
            Back
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
          <Table>
            <TableBody>
              {[
                { label: 'Customer', value: customerDetails.name },
                { label: 'Email', value: customerDetails.email },
                { label: 'Phone', value: customerDetails.phone },
                { label: 'Total Balance', value: customerDetails.totalBalance },
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
      <Box sx={{ height: 2, backgroundColor: '#ddd', my: 3 }} />

      {/* Manage Balance Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Manage Balance
        </Typography>
        <Grid container spacing={3}>
          {/* Add Balance Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Add Balance
              </Typography>
              <Grid container spacing={2}>
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

              {/* Buttons */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <FormControlLabel control={<Checkbox />} label="Print Invoice" />
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Reduce Balance Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, backgroundColor: '#f9f9f9' }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Reduce Balance
              </Typography>
              <Grid container spacing={2}>
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

              {/* Buttons */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <FormControlLabel control={<Checkbox />} label="Print Invoice" />
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Border Line */}
      <Box sx={{ height: 2, backgroundColor: '#ddd', my: 3 }} />

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
      <Outlet />
    </Box>
  );
};

CustomerAccount.propTypes = {
  customerDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    totalBalance: PropTypes.string,
  }),
};

export default CustomerAccount;

// Example usage with mock data
CustomerAccount.defaultProps = {
  customerDetails: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    totalBalance: '$5000',
  },
};