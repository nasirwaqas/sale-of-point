import React, { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { Button, TextField, MenuItem, Grid, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GET_INCOME_TYPES_BY_BRANCH, GET_INCOMES_BY_BRANCH } from '../../../../graphQL/queries';

const IncomeHistory = () => {
  const [selectedIncomeType, setSelectedIncomeType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [incomeData, setIncomeData] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  const { loading, error, data: incomeTypesData } = useQuery(GET_INCOME_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75' },
  });

  const handleIncomeTypeChange = (event) => {
    setSelectedIncomeType(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSearch = async () => {
    const searchVariables = {
      branchId: '6770c752a14170831ad68c75',
      incomeTypeId: selectedIncomeType || null,
      fromDate: fromDate ? new Date(fromDate).toISOString() : null,
      toDate: toDate ? new Date(toDate).toISOString() : null,
    };

    console.log('Searching with variables:', searchVariables); // Log the search variables

    try {
      const { data: incomesData } = await client.query({
        query: GET_INCOMES_BY_BRANCH,
        variables: searchVariables,
      });
      setIncomeData(incomesData.getIncomesByBranch.incomeItems);
    } catch (err) {
      console.error('Error fetching income data:', err);
      enqueueSnackbar(`Error fetching income data: ${err.message}`, { variant: 'error' });
    }
  };

  const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10, textAlign: 'center' },
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { flexDirection: "row" },
    tableCol: { width: "33.33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 }
  });

  const MyDocument = () => {
    const selectedIncomeTypeObject = incomeTypesData.getIncomeTypesByBranch.find(
      (incomeType) => incomeType.id === selectedIncomeType
    );

    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>Income History</Text>
            {selectedIncomeTypeObject && (
              <Text>{selectedIncomeTypeObject.name}</Text>
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Amount</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Description</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
            </View>
            {incomeData.map((income) => (
              <View style={styles.tableRow} key={income.id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{income.amount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{income.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{new Date(income.createdAt).toLocaleDateString()}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading income types!</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Income History</h2>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Income Type"
            variant="outlined"
            fullWidth
            value={selectedIncomeType}
            onChange={handleIncomeTypeChange}
          >
            {incomeTypesData.getIncomeTypesByBranch.map((incomeType) => (
              <MenuItem key={incomeType.id} value={incomeType.id}>
                {incomeType.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="From Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="To Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={handleToDateChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={1.5}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={1.5}>
          <Button variant="contained" color="secondary" fullWidth onClick={() => setShowPDF(true)}>
            Print
          </Button>
        </Grid>
      </Grid>

      {incomeData.length > 0 && (
        <Table style={{ marginTop: '20px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeData.map((income) => (
              <TableRow key={income.id}>
                <TableCell>{income.amount}</TableCell>
                <TableCell>{income.description}</TableCell>
                <TableCell>{new Date(income.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {showPDF && (
        <PDFViewer width="100%" height="600">
          <MyDocument />
        </PDFViewer>
      )}
    </div>
  );
};

export default IncomeHistory;