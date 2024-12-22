import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, FormControlLabel, Switch, Typography } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function LowStockReport() {
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = [
    { product: 'Dog Food', purchasePrice: 20, salePrice: 30, quantities: 5 },
    { product: 'Cat Litter', purchasePrice: 10, salePrice: 15, quantities: 2 },
    { product: 'Bird Cage', purchasePrice: 50, salePrice: 70, quantities: 4 },
    { product: 'Dog Collar', purchasePrice: 8, salePrice: 15, quantities: 6 },
    { product: 'Cat Toys', purchasePrice: 5, salePrice: 10, quantities: 3 },
  ];

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

  const handlePrint = () => {
    const doc = (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <Text style={styles.header}>Low Stock Products Report</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <PDFTableCell>Product</PDFTableCell>
              <PDFTableCell>Purchase Price</PDFTableCell>
              <PDFTableCell>Sale Price</PDFTableCell>
              <PDFTableCell>Quantities</PDFTableCell>
            </View>

            {rows.map((row, index) => (
              <PDFTableRow key={index}>
                <PDFTableCell>{row.product}</PDFTableCell>
                <PDFTableCell>{row.purchasePrice}</PDFTableCell>
                <PDFTableCell>{row.salePrice}</PDFTableCell>
                <PDFTableCell>{row.quantities}</PDFTableCell>
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
      link.download = 'low_stock_report.pdf';
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Title Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Products Low Stock Report</Typography>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      {/* Low Stock Products Table */}
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Low Stock Products
      </Typography>
      <TableContainer component={Paper}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Quantities</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.purchasePrice}</TableCell>
                <TableCell>{row.salePrice}</TableCell>
                <TableCell>{row.quantities}</TableCell>
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

      {/* Dense Toggle */}
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleDenseToggle} />}
        label="Dense Table"
        sx={{ mt: 2 }}
      />
    </Box>
  );
}

// PDF Styles for Printing
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
  table: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
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

// Custom TableRow and TableCell components for PDF rendering
const PDFTableRow = ({ children }) => (
  <View style={styles.tableRow}>
    {children}
  </View>
);

const PDFTableCell = ({ children }) => (
  <View style={styles.tableCell}>
    <Text>{children}</Text>
  </View>
);
