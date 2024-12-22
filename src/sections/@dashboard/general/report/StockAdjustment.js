import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function StockAdjustment() {
  const [showReport, setShowReport] = useState(false);

  const sampleData = [
    {
      Code: 'C001',
      CreatedOn: '2024-12-01',
      ProductName: 'Product A',
      Quantity: 50,
      SalePrice: 100,
      PurchasePrice: 80,
      BatchNo: 'B001',
    },
    {
      Code: 'C002',
      CreatedOn: '2024-12-02',
      ProductName: 'Product B',
      Quantity: 30,
      SalePrice: 200,
      PurchasePrice: 160,
      BatchNo: 'B002',
    },
    {
      Code: 'C003',
      CreatedOn: '2024-12-03',
      ProductName: 'Product C',
      Quantity: 20,
      SalePrice: 300,
      PurchasePrice: 240,
      BatchNo: 'B003',
    },
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
        <Text style={styles.header}>Stock Adjustment</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {['Code', 'CreatedOn', 'ProductName', 'Quantity', 'SalePrice', 'PurchasePrice', 'BatchNo'].map(
              (header, index) => (
                <Text key={index} style={styles.tableCol}>
                  {header}
                </Text>
              )
            )}
          </View>

          {/* Table Body */}
          {sampleData.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.Code}</Text>
              <Text style={styles.tableCol}>{item.CreatedOn}</Text>
              <Text style={styles.tableCol}>{item.ProductName}</Text>
              <Text style={styles.tableCol}>{item.Quantity}</Text>
              <Text style={styles.tableCol}>{item.SalePrice}</Text>
              <Text style={styles.tableCol}>{item.PurchasePrice}</Text>
              <Text style={styles.tableCol}>{item.BatchNo}</Text>
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
        <Typography variant="h4">Stock Adjustment</Typography>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField
          label="From Date"
          variant="outlined"
          size="small"
          type="date"
          sx={{ minWidth: '20vw' }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To Date"
          variant="outlined"
          size="small"
          type="date"
          sx={{ minWidth: '20vw' }}
          InputLabelProps={{ shrink: true }}
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
