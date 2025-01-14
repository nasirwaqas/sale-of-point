import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useApolloClient } from '@apollo/client';
import { Button, TextField, MenuItem, Grid, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Container, FormControlLabel, Switch, Card, TableContainer, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GET_EXPENSE_TYPES_BY_BRANCH, GET_EXPENSES_BY_BRANCH } from '../../../../graphQL/queries';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import {
  useTable,
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSkeleton,
} from '../../../../components/table';
import Scrollbar from '../../../../components/scrollbar';

const TABLE_HEAD = [
  { id: 'amount', label: 'Amount', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
];

const ExpenseHistory = () => {
  const [selectedExpenseType, setSelectedExpenseType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();
  const { themeStretch } = useSettingsContext();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { loading, error, data: expenseTypesData } = useQuery(GET_EXPENSE_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75' },
  });

  const handleSearch = useCallback(async () => {
    const searchVariables = {
      branchId: '6770c752a14170831ad68c75',
      expenseTypeId: selectedExpenseType || null,
      fromDate: fromDate ? new Date(fromDate).toISOString() : null,
      toDate: toDate ? new Date(toDate).toISOString() : null,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };

    console.log('Searching with variables:', searchVariables); // Log the search variables

    try {
      const { data: expensesData } = await client.query({
        query: GET_EXPENSES_BY_BRANCH,
        variables: searchVariables,
      });
      setExpenseData(expensesData.getExpensesByBranch.expenseItems);
    } catch (err) {
      console.error('Error fetching expense data:', err);
      enqueueSnackbar(`Error fetching expense data: ${err.message}`, { variant: 'error' });
    }
  }, [client, enqueueSnackbar, fromDate, page, rowsPerPage, selectedExpenseType, toDate]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleExpenseTypeChange = (event) => {
    setSelectedExpenseType(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
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
    const selectedExpenseTypeObject = expenseTypesData.getExpenseTypesByBranch.find(
      (expenseType) => expenseType.id === selectedExpenseType
    );

    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text>Expense History</Text>
            {selectedExpenseTypeObject && (
              <Text>{selectedExpenseTypeObject.name}</Text>
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
            {expenseData.map((expense) => (
              <View style={styles.tableRow} key={expense.id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{expense.amount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{expense.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{new Date(expense.createdAt).toLocaleDateString()}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading expense types!</p>;

  return (
    <>
      <Helmet>
        <title>Expense History | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Expense History"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Expense', href: PATH_DASHBOARD.root.expense },
            { name: 'History' },
          ]}
        />
            <div style={{ padding: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Expense Type"
              variant="outlined"
              fullWidth
              value={selectedExpenseType}
              onChange={handleExpenseTypeChange}
            >
              {expenseTypesData.getExpenseTypesByBranch.map((expenseType) => (
                <MenuItem key={expenseType.id} value={expenseType.id}>
                  {expenseType.name}
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

        <Card>
          <TableContainer component={Paper}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={expenseData.length}
                  onSort={onSort}
                />
                <TableBody>
                  {!expenseData.length && loading && <TableSkeleton />}
                  {expenseData.length > 0 && expenseData.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{new Date(expense.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableEmptyRows
                    height={dense ? 52 : 72}
                    emptyRows={emptyRows(page, rowsPerPage, expenseData.length)}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={expenseData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>

        {showPDF && (
          <PDFViewer width="100%" height="600">
            <MyDocument />
          </PDFViewer>
        )}
      </div>
      </Container>

  
    </>
  );
};

export default ExpenseHistory;
