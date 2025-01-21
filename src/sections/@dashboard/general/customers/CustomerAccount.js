import React, { useState } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
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
  TableHead,
  TableFooter,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { PATH_DASHBOARD } from '../../../../routes/paths';
import { GET_CUSTOMER_BY_ID, GET_TOTAL_BALANCE_BY_ID, SEARCH_CUSTOMER_BALANCE } from '../../../../graphQL/queries';
import { CREATE_CUSTOMER_BALANCE } from '../../../../graphQL/mutations';

import CustomerBalancePDF from './CustomerBalancePDF';



const CustomerAccount = () => {
  const { id } = useParams(); // Get the customerId from the URL parameter
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar
  const [addBalanceData, setAddBalanceData] = useState({
    date: '',
    amount: '',
    description: '',
  });
  const [reduceBalanceData, setReduceBalanceData] = useState({
    date: '',
    amount: '',
    description: '',
  });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [balances, setBalances] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search is performed
  const [showPDF, setShowPDF] = useState(false); // Track if PDF should be shown

  const { loading, error, data: customerData } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { id },
  });

  const { loading: balanceLoading, error: balanceError, data: balanceData, refetch: refetchBalance } = useQuery(GET_TOTAL_BALANCE_BY_ID, {
    variables: { id },
  });

  const { data: searchBalancesResult, loading: searchLoading, error: searchError, refetch: refetchBalances } = useQuery(SEARCH_CUSTOMER_BALANCE, {
    variables: { customerId: id, fromDate, toDate },
    skip: !fromDate || !toDate, // Only fetch data when both fromDate and toDate are set
    onCompleted: (data) => {
      setBalances(data.searchCustomerBalance.balances);
    },
  });

  const [createCustomerBalance] = useMutation(CREATE_CUSTOMER_BALANCE);

  const handleMessage = () => {
    navigate(PATH_DASHBOARD.customer.message(id));
  };

  const handleAddBalanceChange = (e) => {
    const { name, value } = e.target;
    setAddBalanceData({
      ...addBalanceData,
      [name]: value,
    });
  };

  const handleReduceBalanceChange = (e) => {
    const { name, value } = e.target;
    setReduceBalanceData({
      ...reduceBalanceData,
      [name]: value,
    });
  };

  const handleAddBalance = async () => {
    try {
      const totalBalance = balanceData.getTotalBalanceById;
      const newTotalBalance = totalBalance + parseFloat(addBalanceData.amount);

      await createCustomerBalance({
        variables: {
          customerId: id, // Use the id parameter here
          branchId: '60d0fe4f5311236168a109ca', // Replace with actual branchId
          balanceType: 'add',
          date: addBalanceData.date,
          amount: parseFloat(addBalanceData.amount),
          description: addBalanceData.description,
          balance: newTotalBalance, // Pass the calculated total balance here
        },
      });
      enqueueSnackbar('Balance added successfully!', { variant: 'success' });
      setAddBalanceData({ date: '', amount: '', description: '' }); // Reset form fields
      refetchBalance(); // Refetch the total balance
    } catch (err) {
      console.error('Error adding balance:', err);
      enqueueSnackbar('Error adding balance', { variant: 'error' });
    }
  };

  const handleBack = () => navigate(-1);

  const handleReduceBalance = async () => {
    try {
      const totalBalance = balanceData.getTotalBalanceById;
      const newTotalBalance = totalBalance - parseFloat(reduceBalanceData.amount);

      await createCustomerBalance({
        variables: {
          customerId: id, // Use the id parameter here
          branchId: '60d0fe4f5311236168a109ca', // Replace with actual branchId
          balanceType: 'reduce',
          date: reduceBalanceData.date,
          amount: parseFloat(reduceBalanceData.amount),
          description: reduceBalanceData.description,
          balance: newTotalBalance, // Pass the calculated total balance here
        },
      });
      enqueueSnackbar('Balance reduced successfully!', { variant: 'success' });
      setReduceBalanceData({ date: '', amount: '', description: '' }); // Reset form fields
      refetchBalance(); // Refetch the total balance
    } catch (err) {
      console.error('Error reducing balance:', err);
      enqueueSnackbar('Error reducing balance', { variant: 'error' });
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

  if (loading || balanceLoading || searchLoading) return <p>Loading...</p>;
  if (error || balanceError || searchError) return <p>Error: </p>;

  const customerDetails = customerData?.getCustomerById;
  const totalBalance = balanceData?.getTotalBalanceById;

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
          <Button variant="outlined" color="primary" size="small" onClick={handleBack}>
            Back
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
          <Table>
            <TableBody>
              {[
                { label: 'Customer', value: customerDetails?.name },
                { label: 'Phone', value: customerDetails?.phone },
                { label: 'Address', value: customerDetails?.address },
                { label: 'Total Balance', value: totalBalance },
                // { label: 'Image', value: <img src={`${process.env.REACT_APP_API_URL}/${customerDetails.image}`} alt="Customer" style={{ maxWidth: '100px', maxHeight: '100px' }} /> },
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
                    name="date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={addBalanceData.date}
                    onChange={handleAddBalanceChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={addBalanceData.amount}
                    onChange={handleAddBalanceChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    size="small"
                    value={addBalanceData.description}
                    onChange={handleAddBalanceChange}
                  />
                </Grid>
              </Grid>

              {/* Buttons */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <FormControlLabel control={<Checkbox />} label="Print Invoice" />
                <Button variant="contained" color="primary" onClick={handleAddBalance}>
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
                    name="date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={reduceBalanceData.date}
                    onChange={handleReduceBalanceChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={reduceBalanceData.amount}
                    onChange={handleReduceBalanceChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    size="small"
                    value={reduceBalanceData.description}
                    onChange={handleReduceBalanceChange}
                  />
                </Grid>
              </Grid>

              {/* Buttons */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <FormControlLabel control={<Checkbox />} label="Print Invoice" />
                <Button variant="contained" color="primary" onClick={handleReduceBalance}>
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
                    {/* <TableCell>Type</TableCell> */}
                    <TableCell>Purchases</TableCell>
                    <TableCell>CashPayment</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balances.map((balance) => {
                    const purchases = balance.balanceType === 'reduce' ? balance.amount : '';
                    const cashPayment = balance.balanceType === 'add' ? balance.amount : '';
                    return (
                      <TableRow key={balance.id}>
                        <TableCell>{balance.date}</TableCell>
                        <TableCell>{balance.amount}</TableCell>
                        {/* <TableCell>{balance.balanceType}</TableCell> */}
                        <TableCell>{purchases}</TableCell>
                        <TableCell>{cashPayment}</TableCell>
                        <TableCell>{balance.description}</TableCell>
                        <TableCell>{balance.balance}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>Total Balance</TableCell>
                    <TableCell>{totalBalance}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      {showPDF && customerDetails && <CustomerBalancePDF balances={balances} customerDetails={customerDetails} />}

      <Outlet />
    </Box>
  );
};

export default CustomerAccount;