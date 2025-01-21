import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer';
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
const CustomerBalancePDF = ({ customerDetails, balances }) => {
  const generatePDF = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Customer Balance Report</Text>
            <Text style={styles.subtitle}>Customer: {customerDetails.name}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Date</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Purchases</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>CashPayment</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Description</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Balance</Text>
              </View>
            </View>
            {balances.map((balance) => (
              <View style={styles.tableRow} key={balance.id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{format(new Date(balance.date), 'dd/MM/yyyy')}</Text>
                </View>
            
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{balance.balanceType === 'reduce' ? balance.amount : ''}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{balance.balanceType === 'add' ? balance.amount : ''}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{balance.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{balance.balance}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div>
      <button type="button" onClick={generatePDF}>Print PDF</button>
      <PDFViewer width="100%" height="600">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.title}>Customer Balance Report</Text>
              <Text style={styles.subtitle}>Customer: {customerDetails.name}</Text>
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
                  <Text style={[styles.tableCell, styles.tableHeader]}>Purchases</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>CashPayment</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>Description</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.tableHeader]}>Balance</Text>
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
                    <Text style={styles.tableCell}>{balance.balanceType === 'reduce' ? balance.amount : ''}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{balance.balanceType === 'add' ? balance.amount : ''}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{balance.description}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{balance.balance}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

CustomerBalancePDF.propTypes = {
  customerDetails: PropTypes.object.isRequired,
  balances: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      balanceType: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CustomerBalancePDF;