import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export default function VendorPurchaseHistory() {
  const [showReport, setShowReport] = useState(false);

  const sampleData = [
    {
      PurchaseId: 'P001',
      PurchaseDate: '2024-12-01',
      CreatedOn: '2024-12-01',
      Vendor: 'Vendor A',
      CompanyInvoice: 'INV001',
      BatchNo: 'B001',
      TotalPurchase: 5000,
      DiscountRs: 200,
      Subtotal: 4800,
      PaidBalance: 4800,
    },
    {
      PurchaseId: 'P002',
      PurchaseDate: '2024-12-02',
      CreatedOn: '2024-12-02',
      Vendor: 'Vendor B',
      CompanyInvoice: 'INV002',
      BatchNo: 'B002',
      TotalPurchase: 3000,
      DiscountRs: 100,
      Subtotal: 2900,
      PaidBalance: 2900,
    },
    {
      PurchaseId: 'P003',
      PurchaseDate: '2024-12-03',
      CreatedOn: '2024-12-03',
      Vendor: 'Vendor C',
      CompanyInvoice: 'INV003',
      BatchNo: 'B003',
      TotalPurchase: 7000,
      DiscountRs: 500,
      Subtotal: 6500,
      PaidBalance: 6500,
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
        <Text style={styles.header}>Vendor Purchase History</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {[
              'PurchaseId',
              'Purchase Date',
              'CreatedOn',
              'Vendor',
              'Company Invoice',
              'BatchNo',
              'TotalPurchase',
              'DiscountRs',
              'Subtotal',
              'Paid Balance',
            ].map((header, index) => (
              <Text key={index} style={styles.tableCol}>
                {header}
              </Text>
            ))}
          </View>

          {/* Table Body */}
          {sampleData.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.PurchaseId}</Text>
              <Text style={styles.tableCol}>{item.PurchaseDate}</Text>
              <Text style={styles.tableCol}>{item.CreatedOn}</Text>
              <Text style={styles.tableCol}>{item.Vendor}</Text>
              <Text style={styles.tableCol}>{item.CompanyInvoice}</Text>
              <Text style={styles.tableCol}>{item.BatchNo}</Text>
              <Text style={styles.tableCol}>{item.TotalPurchase}</Text>
              <Text style={styles.tableCol}>{item.DiscountRs}</Text>
              <Text style={styles.tableCol}>{item.Subtotal}</Text>
              <Text style={styles.tableCol}>{item.PaidBalance}</Text>
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
        <Typography variant="h4">Vendor Purchase History</Typography>
      </Box>

      {/* Input Fields and Buttons Section */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <TextField
          label="Vendor"
          variant="outlined"
          size="small"
          type="input"
          sx={{ minWidth: '20vw' }}
        
        />
        
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
