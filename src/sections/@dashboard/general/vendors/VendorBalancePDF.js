import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    textAlign: 'center', // Center align the text
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
});

// Create Document Component
const VendorBalancePDF = ({ vendorName, balances }) => (
  <PDFViewer width="100%" height="600">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Vendor Balance Report</Text>
          <Text style={styles.subtitle}>Vendor: {vendorName}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Amount</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Description</Text>
            </View>
          </View>
          {balances.map((balance) => (
            <View style={styles.tableRow} key={balance.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{format(new Date(balance.date), 'dd/MM/yyyy')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{balance.amount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{balance.type}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{balance.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

VendorBalancePDF.propTypes = {
  vendorName: PropTypes.string.isRequired,
  balances: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VendorBalancePDF;