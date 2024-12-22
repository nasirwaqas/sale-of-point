import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function CashInHand() {
  const [showReport, setShowReport] = useState(false);

  const sampleData = [
    {
      OpeningBalance: 10000,
      RowNum: 1,
      Date: '2024-12-01',
      CashSale: 5000,
      CustomerCollected: 2000,
      VendorDebit: 1000,
      PurchaseReturn: 500,
      Income: 500,
      TotalCashIn: 13000,
      SaleReturn: 300,
      CashPurchase: 2000,
      VendorCredit: 500,
      Expenses: 1000,
      TotalCashOut: 3800,
      CashInHand: 9200,
    },
    {
      OpeningBalance: 9200,
      RowNum: 2,
      Date: '2024-12-02',
      CashSale: 7000,
      CustomerCollected: 1500,
      VendorDebit: 1200,
      PurchaseReturn: 400,
      Income: 800,
      TotalCashIn: 18700,
      SaleReturn: 200,
      CashPurchase: 3500,
      VendorCredit: 700,
      Expenses: 1200,
      TotalCashOut: 5600,
      CashInHand: 13100,
    },
  ];

  const handleSearch = () => {
    setShowReport(true);
  };

  const styles = StyleSheet.create({
    page: { padding: 20, flexDirection: 'column' },
    header: { fontSize: 14, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
    table: { display: 'table', width: '100%', borderCollapse: 'collapse', margin: '0 auto' },
    tableRow: { flexDirection: 'row' },
    tableCol: {
      fontSize: 9,
      flex: 1,
      borderWidth: 1,
      borderColor: '#000',
      padding: 4,
      textAlign: 'center',
    },
    tableHeader: {
      fontSize: 10,
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
      textAlign: 'center',
      padding: 4,
    },
  });

  const StockReportPDF = () => (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.header}>Cash in Hand</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {[
              'OpeningBalance',
              'RowNum',
              'Date',
              'CashSale',
              'CustomerCollected',
              'VendorDebit',
              'PurchaseReturn',
              'Income',
              'TotalCashIn',
              'SaleReturn',
              'CashPurchase',
              'VendorCredit',
              'Expenses',
              'TotalCashOut',
              'CashInHand',
            ].map((header, index) => (
              <Text key={index} style={styles.tableCol}>
                {header}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          {sampleData.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.OpeningBalance}</Text>
              <Text style={styles.tableCol}>{item.RowNum}</Text>
              <Text style={styles.tableCol}>{item.Date}</Text>
              <Text style={styles.tableCol}>{item.CashSale}</Text>
              <Text style={styles.tableCol}>{item.CustomerCollected}</Text>
              <Text style={styles.tableCol}>{item.VendorDebit}</Text>
              <Text style={styles.tableCol}>{item.PurchaseReturn}</Text>
              <Text style={styles.tableCol}>{item.Income}</Text>
              <Text style={styles.tableCol}>{item.TotalCashIn}</Text>
              <Text style={styles.tableCol}>{item.SaleReturn}</Text>
              <Text style={styles.tableCol}>{item.CashPurchase}</Text>
              <Text style={styles.tableCol}>{item.VendorCredit}</Text>
              <Text style={styles.tableCol}>{item.Expenses}</Text>
              <Text style={styles.tableCol}>{item.TotalCashOut}</Text>
              <Text style={styles.tableCol}>{item.CashInHand}</Text>
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
        <Typography variant="h4">Cash in Hand</Typography>
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
