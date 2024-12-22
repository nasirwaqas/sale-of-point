import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for the PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 'auto',
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
  },
});

const PDFTable = ({ data }) => (
  <Document>
    <Page style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Purchase Return History</Text>
      <View style={pdfStyles.table}>
        {/* Table Header */}
        <View style={pdfStyles.tableRow}>
          <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Invoice #</Text>
          <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Purchase Invoice #</Text>
          <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Total Amount</Text>
          <Text style={[pdfStyles.tableCellHeader, { width: '25%' }]}>Date</Text>
        </View>
        {/* Table Body */}
        {data.map((row, index) => (
          <View style={pdfStyles.tableRow} key={index}>
            <Text style={[pdfStyles.tableCell, { width: '25%' }]}>{row.invoiceNumber}</Text>
            <Text style={[pdfStyles.tableCell, { width: '25%' }]}>{row.purchaseInvoiceNumber}</Text>
            <Text style={[pdfStyles.tableCell, { width: '25%' }]}>{row.totalAmount}</Text>
            <Text style={[pdfStyles.tableCell, { width: '25%' }]}>{row.date}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function PurchaseReturnHistory() {
  const [showTable, setShowTable] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const handleSearch = () => {
    setShowTable(true);
  };

  const handlePrint = () => {
    setShowPDF(true);
  };

  const data = [
    {
      invoiceNumber: '10021',
      purchaseInvoiceNumber: '71739',
      totalAmount: '450.00',
      date: 'Dec 3, 2024 7:48:04 PM',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Purchase Return History</Typography>
        <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
          Purchase Return
        </Button>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 6,
        }}
      >
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          size="small"
          sx={{ minWidth: '25vw' }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          size="small"
          sx={{ minWidth: '25vw' }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" color="success" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      {/* Table Section */}
      {showTable && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Purchase Invoice #</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.invoiceNumber}</TableCell>
                  <TableCell>{row.purchaseInvoiceNumber}</TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* PDF Viewer */}
      {showPDF && (
        <PDFViewer style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <PDFTable data={data} />
        </PDFViewer>
      )}
    </Box>
  );
}
