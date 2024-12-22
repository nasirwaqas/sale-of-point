import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function StockExpiry() {
  const [showReport, setShowReport] = useState(false);

  const sampleData = [
    { ProductName: 'Product A', ExpiryDate: '2025-01-01', BatchNo: 'B001', Quantity: 100 },
    { ProductName: 'Product B', ExpiryDate: '2025-06-15', BatchNo: 'B002', Quantity: 150 },
    { ProductName: 'Product C', ExpiryDate: '2026-03-20', BatchNo: 'B003', Quantity: 200 },
  ];

  const handleSearch = () => {
    setShowReport(true);
  };

  const styles = StyleSheet.create({
    page: { padding: 20 },
    header: { fontSize: 12, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
    table: { display: 'table', width: '100%', borderCollapse: 'collapse', margin: '10px 0' },
    tableRow: { flexDirection: 'row' },
    tableCol: { fontSize: 9, flex: 1, borderWidth: 1, borderColor: '#000', padding: 1, textAlign: 'center' },
    tableHeader: { fontSize: 9, fontWeight: 'bold', backgroundColor: '#f2f2f2', padding: 1, textAlign: 'center' },
  });

  const StockReportPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Stock Expiry Report</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {['ProductName', 'Expiry Date', 'Batch No', 'Quantity'].map((header, index) => (
              <Text key={index} style={styles.tableCol}>{header}</Text>
            ))}
          </View>

          {/* Table Body */}
          {sampleData.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.ProductName}</Text>
              <Text style={styles.tableCol}>{item.ExpiryDate}</Text>
              <Text style={styles.tableCol}>{item.BatchNo}</Text>
              <Text style={styles.tableCol}>{item.Quantity}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Stock Expiry</Typography>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField
          label="Number of Days from Today"
          type="number"
          variant="outlined"
          size="small"
          sx={{ minWidth: '20vw' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Get Report
        </Button>
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
