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
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 4,
    fontSize: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
});

// Create Document Component
const CustomersBalanceReport = ({ customers, getCustomerBalance, totalBalance }) => {
  console.log('CustomersBalanceReport customers:', customers); // Log customers data
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Customer Balance Report</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Phone</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>CNIC</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Address</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Balance</Text>
            </View>
          </View>
          {customers.map((customer) => (
            <View style={styles.tableRow} key={customer.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{customer.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{customer.phone}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{customer.cnic}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{customer.address}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{getCustomerBalance(customer.id)}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableCol} />
            <View style={styles.tableCol} />
            <View style={styles.tableCol} />
            <View style={styles.tableCol} />
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Total Balance: {totalBalance}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

CustomersBalanceReport.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      cnic: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  getCustomerBalance: PropTypes.func.isRequired,
  totalBalance: PropTypes.number.isRequired,
};

export default CustomersBalanceReport;