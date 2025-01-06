import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useApolloClient } from '@apollo/client';
import { Button, TextField, MenuItem, Grid, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Container, FormControlLabel, Switch, Card, TableContainer, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GET_INCOME_TYPES_BY_BRANCH, GET_INCOMES_BY_BRANCH } from '../../../../graphQL/queries';
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

const IncomeHistory = () => {
  const [selectedIncomeType, setSelectedIncomeType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [incomeData, setIncomeData] = useState([]);
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

  const { loading, error, data: incomeTypesData } = useQuery(GET_INCOME_TYPES_BY_BRANCH, {
    variables: { branchId: '6770c752a14170831ad68c75' },
  });

  const handleSearch = useCallback(async () => {
    const searchVariables = {
      branchId: '6770c752a14170831ad68c75',
      incomeTypeId: selectedIncomeType || null,
      fromDate: fromDate ? new Date(fromDate).toISOString() : null,
      toDate: toDate ? new Date(toDate).toISOString() : null,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
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
  }, [client, enqueueSnackbar, fromDate, page, rowsPerPage, selectedIncomeType, toDate]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleIncomeTypeChange = (event) => {
    setSelectedIncomeType(event.target.value);
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
    <>
      <Helmet>
        <title>Income History | Point of Sale UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Income History"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Income', href: PATH_DASHBOARD.root.income },
            { name: 'History' },
          ]}
        />
      </Container>

      <div style={{ padding: '20px' }}>
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

        <Card>
          <TableContainer component={Paper}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={incomeData.length}
                  onSort={onSort}
                />
                <TableBody>
                  {!incomeData.length && loading && <TableSkeleton />}
                  {incomeData.length > 0 && incomeData.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell>{income.amount}</TableCell>
                      <TableCell>{income.description}</TableCell>
                      <TableCell>{new Date(income.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableEmptyRows
                    height={dense ? 52 : 72}
                    emptyRows={emptyRows(page, rowsPerPage, incomeData.length)}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={incomeData.length}
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
    </>
  );
};

export default IncomeHistory;