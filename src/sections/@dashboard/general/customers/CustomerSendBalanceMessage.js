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
import { useNavigate } from 'react-router-dom';

const CustomerSendBalanceMessage = () => {
  const navigate = useNavigate(); // To navigate back
  const [number, setNumber] = useState('');
  const [template, setTemplate] = useState('');
  const [message, setMessage] = useState('');

  // Example table data
  const data = { customer: 'John Doe', balance: '$100' }; // Single selected customer data

  const handleBack = () => navigate(-1); // Navigate to previous path

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
                  onClick={() => alert('Message saved!')}
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
      </Grid>
    </div>
  );
};

export default CustomerSendBalanceMessage;
