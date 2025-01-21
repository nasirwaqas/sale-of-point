import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMER_BY_ID, GET_TOTAL_BALANCE_BY_ID } from '../../../../graphQL/queries';
import { CREATE_CUSTOMER_MESSAGE } from '../../../../graphQL/mutations';

const CustomerSendMessage = () => {
  const { id } = useParams(); // Get the customerId from the URL parameter
  const navigate = useNavigate(); // To navigate back
  const [number, setNumber] = useState('');
  const [template, setTemplate] = useState('');
  const [message, setMessage] = useState('');

  const { loading: customerLoading, error: customerError, data: customerData } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { id },
  });

  const { loading: balanceLoading, error: balanceError, data: balanceData } = useQuery(GET_TOTAL_BALANCE_BY_ID, {
    variables: { id },
  });

  const [createCustomerMessage] = useMutation(CREATE_CUSTOMER_MESSAGE);

  useEffect(() => {
    if (customerData) {
      setNumber(customerData.getCustomerById.phone);
    }
  }, [customerData]);

  if (customerLoading || balanceLoading) return <p>Loading...</p>;
  if (customerError || balanceError) return <p>Error: {customerError ? customerError.message : balanceError.message}</p>;

  const customerDetails = customerData.getCustomerById;
  const totalBalance = balanceData.getTotalBalanceById;

  const handleBack = () => navigate(-1); // Navigate to previous path

  const handleSaveMessage = async () => {
    try {
      await createCustomerMessage({
        variables: {
          customerId: id,
          customerName: customerDetails.name,
          customerBalance: parseFloat(totalBalance),
          number,
          template,
          message,
          branchId: '60d0fe4f5311236168a109ca', // Replace with actual branchId
        },
      });
      alert('Message saved!');
    } catch (err) {
      console.error('Error saving message:', err);
      alert('Error saving message');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h5">Send Message</Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#f50057', color: '#fff' }}
          onClick={handleBack}
        >
          Back
        </Button>
      </div>

      <Grid container spacing={4}>
        {/* Left side */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number"
                  variant="outlined"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Template"
                  variant="outlined"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSaveMessage}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right side - Table */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Selected Customer
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Customer</strong></TableCell>
                    <TableCell align="right">{customerDetails.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total Balance</strong></TableCell>
                    <TableCell align="right">{totalBalance}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerSendMessage;
