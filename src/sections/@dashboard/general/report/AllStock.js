import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function AllStock() {
  const [short, setShort] = useState('');
  const [showReport, setShowReport] = useState(false);
  const shortOptions = ["Product", "Batch", "SalePrice", "PurchasePrice", "Quantity"];

  const sampleData = [
    { Code: 'P001', Product: 'Product A', Batch: 'B001', SalePrice: 50, PurchasePrice: 30, Quantity: 100 },
    { Code: 'P002', Product: 'Product B', Batch: 'B002', SalePrice: 70, PurchasePrice: 50, Quantity: 150 },
    { Code: 'P003', Product: 'Product C', Batch: 'B003', SalePrice: 90, PurchasePrice: 60, Quantity: 200 },
  ];

  const calculateTotals = (data) => {
    return data.map(item => ({
      ...item,
      TotalSalePrice: item.SalePrice * item.Quantity,
      TotalPurchasePrice: item.PurchasePrice * item.Quantity,
    }));
  };

  const handleSearch = () => {
    setShowReport(true);
  };

  const styles = StyleSheet.create({
    page: { padding: 20 },
    header: { fontSize: 12, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
    table: { display: 'table', width: '100%', borderCollapse: 'collapse', margin: '10px 0' },
    tableRow: { flexDirection: 'row' },
    tableCol: {fontSize: '9', flex: 1, borderWidth: 1, borderColor: '#000', padding: 1, textAlign: 'center' },
    tableHeader: { fontSize: '9', fontWeight: 'bold', backgroundColor: '#f2f2f2', padding: 0, marginTop: 3, textAlign: 'center' },
  });

  const StockReportPDF = () => {
    const dataWithTotals = calculateTotals(sampleData);

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Stock Report</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              {['Code', 'Product', 'Batch', 'SalePrice', 'PurchasePrice', 'Quantity', 'TotalSalePrice', 'TotalPurchasePrice'].map((header, index) => (
                <Text key={index} style={styles.tableCol}>{header}</Text>
              ))}
            </View>

            {/* Table Body */}
            {dataWithTotals.map((item, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.Code}</Text>
                <Text style={styles.tableCol}>{item.Product}</Text>
                <Text style={styles.tableCol}>{item.Batch}</Text>
                <Text style={styles.tableCol}>{item.SalePrice}</Text>
                <Text style={styles.tableCol}>{item.PurchasePrice}</Text>
                <Text style={styles.tableCol}>{item.Quantity}</Text>
                <Text style={styles.tableCol}>{item.TotalSalePrice}</Text>
                <Text style={styles.tableCol}>{item.TotalPurchasePrice}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Stock Report</Typography>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField label="Category" variant="outlined" size="small" sx={{ minWidth: '20vw' }} />
        <FormControl sx={{ minWidth: '20vw' }} size="small">
          <InputLabel>Short By</InputLabel>
          <Select
            value={short}
            onChange={(event) => setShort(event.target.value)}
            label="Short"
          >
            {shortOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>Get Report</Button>
      </Box>

      {/* PDF Viewer */}
      {showReport && (
        <Box sx={{ mt: 3, height: '75vh' }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <StockReportPDF />
          </PDFViewer>
        </Box>
      )}
    </Box>
  );
}
