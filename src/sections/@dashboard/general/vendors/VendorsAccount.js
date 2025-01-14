import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Typography, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { GET_VENDOR_BY_ID, GET_TOTAL_BALANCE_BY_ID, SEARCH_BALANCES } from '../../../../graphQL/queries';
import { CREATE_BALANCE } from '../../../../graphQL/mutations';
import { useSnackbar } from '../../../../components/snackbar';
import VendorBalancePDF from './VendorBalancePDF';

const VendorAccount = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [vendorDetails, setVendorDetails] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);
  const [balanceType, setBalanceType] = useState('reduce');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [balances, setBalances] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search is performed
  const [showPDF, setShowPDF] = useState(false); // Track if PDF should be shown

  const { data: vendorData, loading: vendorLoading, error: vendorError } = useQuery(GET_VENDOR_BY_ID, {
    variables: { id },
    onCompleted: (data) => {
      setVendorDetails(data.getVendorById);
    },
  });

  const { data: balanceData, loading: balanceLoading, error: balanceError } = useQuery(GET_TOTAL_BALANCE_BY_ID, {
    variables: { id },
    onCompleted: (data) => {
      setTotalBalance(data.getTotalBalanceById);
    },
  });

  const { data: searchData, loading: searchLoading, error: searchError, refetch: refetchBalances } = useQuery(SEARCH_BALANCES, {
    variables: { vendorId: id, fromDate, toDate },
    skip: !fromDate || !toDate, // Only fetch data when both fromDate and toDate are set
    onCompleted: (data) => {
      setBalances(data.searchBalances.balances);
    },
  });

  const [createBalance] = useMutation(CREATE_BALANCE, {
    onCompleted: () => {
      enqueueSnackbar('Balance created successfully!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(`Error updating balance: ${error.message}`, { variant: 'error' });
    },
  });

  const handleBalanceSubmit = async () => {
    try {
      await createBalance({
        variables: {
          vendorId: id,
          branchId: vendorDetails.branchId,
          type: balanceType,
          date,
          amount: parseFloat(amount),
          description,
        },
      });
      setBalanceType('reduce');
      setDate('');
      setAmount('');
      setDescription('');
    } catch (err) {
      console.error('Error creating balance:', err);
    }
  };

  const handleSearch = (values) => {
    setFromDate(values.fromDate);
    setToDate(values.toDate);
    setSearchPerformed(true); // Mark search as performed
    refetchBalances(); // Refetch balances with the new date range
  };

  const handlePrint = () => {
    setShowPDF(true);
  };

  const validationSchema = Yup.object({
    fromDate: Yup.date().required('From Date is required'),
    toDate: Yup.date().required('To Date is required'),
  });

  if (vendorLoading || balanceLoading || searchLoading) return <p>Loading...</p>;
  if (vendorError) return <p>Error loading vendor details: {vendorError.message}</p>;
  if (balanceError) return <p>Error loading balance: {balanceError.message}</p>;
  if (searchError) return <p>Error loading history: {searchError.message}</p>;

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
              {[{ label: 'Vendor', value: vendorDetails.name }, { label: 'Email', value: vendorDetails.email }, { label: 'Phone', value: vendorDetails.phone }, { label: 'Total Balance', value: totalBalance || '0' }]
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{row.label}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Manage Balance Section */}
      <Box sx={{ mb: 3, p: 2, borderRadius: 1, backgroundColor: '#f7f7f7' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Manage Balance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Balance Type" select fullWidth value={balanceType} onChange={(e) => setBalanceType(e.target.value)} variant="outlined" size="small">
              <MenuItem value="reduce">Reduce</MenuItem>
              <MenuItem value="add">Add</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Date" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Amount" type="number" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)} variant="outlined" size="small" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} variant="outlined" size="small" />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleBalanceSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* History Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          History
        </Typography>

        {/* Formik Form for Search */}
        <Formik
          initialValues={{ fromDate, toDate }}
          validationSchema={validationSchema}
          onSubmit={handleSearch}
        >
          {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="fromDate"
                    as={TextField}
                    label="From Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={values.fromDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fromDate && Boolean(errors.fromDate)}
                    helperText={touched.fromDate && errors.fromDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="toDate"
                    as={TextField}
                    label="To Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={values.toDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.toDate && Boolean(errors.toDate)}
                    helperText={touched.toDate && errors.toDate}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Search
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={!searchPerformed} // Disable button until search is performed
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        {/* Display History */}
        <Box sx={{ mt: 3 }}>
          {balances.length === 0 ? (
            <Typography variant="body2" color="textSecondary">No history available for the selected date range.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balances.map((balance) => (
                    <TableRow key={balance.id}>
                      <TableCell>{balance.date}</TableCell>
                      <TableCell>{balance.amount}</TableCell>
                      <TableCell>{balance.type}</TableCell>
                      <TableCell>{balance.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      {/* PDF Viewer */}
      {showPDF && (
        <Box sx={{ mt: 3 }}>
          <VendorBalancePDF vendorName={vendorDetails.name} balances={balances} />
        </Box>
      )}
    </Box>
  );
};

export default VendorAccount;