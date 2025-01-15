import PropTypes from 'prop-types';
import { Page, View, Text, Document } from '@react-pdf/renderer';
import { fontSize, fontWeight } from '@mui/system';
import { fCurrency } from '../../../../utils/formatNumber';

// Define the styles inline for the PDF document
const styles = {
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mb40: {
    marginBottom: 40,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '28%',
  },
  h4: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: '5px',
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: '5px',
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 20,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #ccc',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #ccc',
  },
  tableCell: {
    width: '20%', // Adjusted for 5 columns
    padding: 5,
  },
  tableBody: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontSize: 9,
  },
  noBorder: {
    borderBottom: 'none',
  },
  alignRight: {
    textAlign: 'right',
  },
};

CustomersBalanceReport.propTypes = {
  customer: PropTypes.array,
};

export default function CustomersBalanceReport({ customer }) {
  const totalBalance = customer.reduce((sum, cust) => {
    const customerAccount = parseFloat(cust.customerAccount);
    return sum + (Number.isNaN(customerAccount) ? 0 : customerAccount);
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={[styles.gridContainer, styles.mb40]}>
          <Text style={styles.h3}>Customer Balance Report</Text>
        </View>

        {/* Customer Details Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>Customer Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>Phone</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>CNIC</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>Address</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>Balance</Text>
              </View>
            </View>
          </View>

          {/* Table Body */}
          <View style={styles.tableBody}>
            {customer.map((cust, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell}>
                  <Text>{cust.customerName}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{cust.customerPhone}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{cust.customerCnic}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{cust.customerAddress}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{fCurrency(parseFloat(cust.customerAccount))}</Text>
                </View>
              </View>
            ))}

            {/* Footer Row with Total */}
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell} />
              <View style={styles.tableCell} />
              <View style={styles.tableCell} />
              <View style={styles.tableCell}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(totalBalance)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}