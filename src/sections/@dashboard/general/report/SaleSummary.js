import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, FormControlLabel, Switch } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Custom TableRow and TableCell components for PDF rendering
const PDFTableRow = ({ children }) => (
  <View style={styles.tableRow}>
    {children}
  </View>
);

const PDFTableCell = ({ children, style }) => (
  <View style={[styles.tableCell, style]}>
    <Text>{children}</Text>
  </View>
);

export default function SaleSummary() {
  const [showTable, setShowTable] = useState(false);
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleBack = () => {
    window.history.back(); // Navigate back
  };

  const handleSearch = () => {
    setShowTable(true); // Show table when search is clicked
  };

  const handlePrint = () => {
    if (!showTable) return; // Ensure table data is visible before printing

    const doc = (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <Text style={styles.header}>Sale Summary</Text>
          <Text style={styles.dateRange}>From: 12/01/2024 To: 12/31/2024</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <PDFTableCell style={styles.tableHeaderCell}>Date</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Count</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Gross Sale</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Discount</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Total Sale</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Total Return</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Net Sale</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>Cost of Sale</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>G/P Amount</PDFTableCell>
              <PDFTableCell style={styles.tableHeaderCell}>G/P (%)</PDFTableCell>
            </View>

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <PDFTableRow key={index}>
                <PDFTableCell>{row.date}</PDFTableCell>
                <PDFTableCell>{row.count}</PDFTableCell>
                <PDFTableCell>${row.grossSale.toFixed(2)}</PDFTableCell>
                <PDFTableCell>${row.discount.toFixed(2)}</PDFTableCell>
                <PDFTableCell>${row.totalSale.toFixed(2)}</PDFTableCell>
                <PDFTableCell>${row.totalReturn.toFixed(2)}</PDFTableCell>
                <PDFTableCell>${row.netSale.toFixed(2)}</PDFTableCell>
                <PDFTableCell>${row.costOfSale.toFixed(2)}</PDFTableCell>
                <PDFTableCell>${row.gpAmount.toFixed(2)}</PDFTableCell>
                <PDFTableCell>{row.gpPercent}</PDFTableCell>
              </PDFTableRow>
            ))}
          </View>
        </Page>
      </Document>
    );

    pdf(doc).toBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sale_summary.pdf';
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDenseToggle = () => {
    setDense(!dense);
  };

  // Sample Data
  const rows = [
    { date: '12/01/2024', count: 15, grossSale: 1200, discount: 100, totalSale: 1100, totalReturn: 50, netSale: 1050, costOfSale: 600, gpAmount: 450, gpPercent: '37.5%' },
    { date: '12/02/2024', count: 10, grossSale: 800, discount: 50, totalSale: 750, totalReturn: 30, netSale: 720, costOfSale: 400, gpAmount: 320, gpPercent: '40.0%' },
    // Add more rows as needed
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Inline Print Styles */}
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
            }

            @page {
              size: A4 landscape;
              margin: 10mm;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }

            thead th {
              background-color: #f2f2f2;
              color: black;
              -webkit-print-color-adjust: exact;
            }

            /* Hide elements not needed in print */
            .no-print {
              display: none;
            }
          }
        `}
      </style>

      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Sale Summary</Typography>
        <Button variant="contained" color="secondary" onClick={handleBack} className="no-print">
          Back
        </Button>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 2,
        }}
      >
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          size="small"
          sx={{ minWidth: '25vw' }}
          InputLabelProps={{ shrink: true }}
          className="no-print"
        />
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          size="small"
          sx={{ minWidth: '25vw' }}
          InputLabelProps={{ shrink: true }}
          className="no-print"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} className="no-print">
          Search
        </Button>
        <Button variant="contained" color="success" onClick={handlePrint} className="no-print">
          Print
        </Button>
      </Box>

      {/* Table Section */}
      {showTable && (
        <Box>
          {/* Table Heading */}
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Sale Summary
          </Typography>
          {/* Date Range */}
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            From: 12/01/2024 To: 12/31/2024
          </Typography>

          {/* Table Data */}
          <TableContainer component={Paper}>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Gross Sale</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Total Sale</TableCell>
                  <TableCell>Total Return</TableCell>
                  <TableCell>Net Sale</TableCell>
                  <TableCell>Cost of Sale</TableCell>
                  <TableCell>G/P Amount</TableCell>
                  <TableCell>G/P (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>${row.grossSale.toFixed(2)}</TableCell>
                    <TableCell>${row.discount.toFixed(2)}</TableCell>
                    <TableCell>${row.totalSale.toFixed(2)}</TableCell>
                    <TableCell>${row.totalReturn.toFixed(2)}</TableCell>
                    <TableCell>${row.netSale.toFixed(2)}</TableCell>
                    <TableCell>${row.costOfSale.toFixed(2)}</TableCell>
                    <TableCell>${row.gpAmount.toFixed(2)}</TableCell>
                    <TableCell>{row.gpPercent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}

      {/* Dense Toggle */}
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleDenseToggle} />}
        label="Dense"
        sx={{ mt: 2 }}
      />
    </Box>
  );
}

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    flexDirection: 'column',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateRange: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableHeaderCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    flex: 1,
  },
});
