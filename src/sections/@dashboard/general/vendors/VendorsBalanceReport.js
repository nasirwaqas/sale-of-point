import PropTypes from 'prop-types';
import { Page, View, Text, Document } from '@react-pdf/renderer';
import { fCurrency } from '../../../../utils/formatNumber';
import { fontSize } from '@mui/system';

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
    textAlign: 'center',  // Center the h3 header
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
    
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #ccc',
  },
  tableCell: {
    width: '25%', // Set equal width for each cell
    padding: 5, // Equal padding for all cells
  },
  tableBody: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontSize : '12',

  },
  noBorder: {
    borderBottom: 'none',
  },
  alignRight: {
    textAlign: 'right',
  },

  col8: {
    width: '80%',
  },
  col4: {
    width: '20%',
    textAlign: 'right',
  },
};

VendorBalanceReport.propTypes = {
  vendors: PropTypes.array,
};

export default function VendorBalanceReport({ vendors }) {
  const totalBalance = vendors.reduce((sum, vendor) => {
    const vendorAccount = parseFloat(vendor.vendorAccount);
    return sum + (isNaN(vendorAccount) ? 0 : vendorAccount);
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={[styles.gridContainer, styles.mb40]}>
          <Text style={styles.h3}>Vendors Balance Report</Text>
        </View>

        {/* Vendor Details Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>Vendor Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.subtitle2}>Phone</Text>
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
            {vendors.map((vendor, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell}>
                  <Text>{vendor.vendorName}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{vendor.vendorPhone}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{vendor.vendorAddress}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{fCurrency(parseFloat(vendor.vendorAccount))}</Text>
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
