import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Divider,
  TableContainer,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  
  TableCell,
  TableHead,
  TableRow,
  Size,
  Item,
  Paper,
} from '@mui/material';

export default function Purchase() {
    const [rows, setRows] = useState([
        {
          id: 1,
          code: "123",
          name: "Example Product",
          boxQuantity: 5,
          boxPurchasePrice: 100,
          purchasePrice: 100,
          salePrice: 120,
          quantity: 20,
          expiryDate: "2022-12-12",
          total: 1080,
        },
      ]);
  const [discountValue, setDiscountValue] = useState({ percentage: 0, amount: 0 });
  const [amount, setAmount] = useState(0);

  const handlePercentageChange = (e) => {
    const percentage = parseFloat(e.target.value) || 0;
    const calculatedAmount = (percentage / 100) * amount;
    setDiscountValue({ percentage, amount: calculatedAmount });
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    const calculatedPercentage = (value / amount) * 100;
    setDiscountValue({ percentage: calculatedPercentage, amount: value });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* First Section */}
      <Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight="bold">
              Purchase Order
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="contained" sx={{ m: 1 }}>Hold Invoice</Button>
            <Button variant="contained" sx={{ m: 1 }}>Recent Invoice</Button>
            <Button variant="contained" sx={{ m: 1 }}>Return</Button>
            <Button variant="contained" sx={{ m: 1 }}>Settings</Button>
            <Button variant="contained" sx={{ m: 1 }}>History</Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

        {/* Input Fields Row 1 */}
        <Grid container spacing={2}>
          <Grid item xs={2.3}>
            <TextField fullWidth label="Product (Alt+P)" variant="outlined" />
          </Grid>
          <Grid item xs={2.3}>
            <TextField fullWidth label="Code (Alt+C)" variant="outlined" />
          </Grid>
          <Grid item xs={2.3}>
            <TextField fullWidth label="Vendor (Alt+V)" variant="outlined" />
          </Grid>
          <Grid item xs={2.3}>
            <TextField fullWidth label="Customer" variant="outlined" />
          </Grid>
          <Grid item xs={2.3}>
            <TextField fullWidth label="Company Invoice#" variant="outlined" />
          </Grid>
        </Grid>

        {/* Input Fields Row 2 */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={2}>
            <TextField fullWidth label="Purchase Date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />
            {/* Table Section */}
            <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Sr#</TableCell>
            <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Box Quantities</TableCell>
              <TableCell>Box Purchase Price</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Quantities</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.boxQuantity}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.boxPurchasePrice}
                    onChange={(e) => handleInputChange(e, row.id, "boxPurchasePrice")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.purchasePrice}
                    onChange={(e) => handleInputChange(e, row.id, "purchasePrice")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.salePrice}
                    onChange={(e) => handleInputChange(e, row.id, "salePrice")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.quantity}
                    onChange={(e) => handleInputChange(e, row.id, "quantity")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.expiryDate}
                    onChange={(e) => handleInputChange(e, row.id, "expiryDate")}
                  />
                </TableCell>
                <TableCell>{row.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />

      {/* Second Section */}
      <Grid 
  container 
  spacing={0} 
  wrap="wrap" 
  sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}
>
  {[
    {
      label: 'Total Quantity',
      value: '10',
    },
    {
      label: 'Discount(alt+d)%/Rs',
      inputs: ['%', 'Rs'],
    },
    {
      label: 'Tax',
      inputs: ['%', 'Rs'],
    },
    {
      label: 'Total Amount',
      value: '30',
    },
    {
      label: 'Payable',
      value: '30',
    },
    {
      label: 'Enter Amount(alt+e)',
      inputs: [''],
    },
    {
      label: 'Receivable',
      value: '30',
    },
    {
      label: 'Balance',
      value: '30',
    },
    {
      label: 'Return',
      value: '30',
    },
  ].map((item, index) => (
    <Grid item xs={12} sm={6} md={2} key={index} sx={{ minWidth: 100 }}>
      <Box sx={{ border: '1px solid #ccc', textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize:'0.8rem'}}>
          {item.label}
        </Typography>
        {item.value ? (
          <Box
            sx={{
              bgcolor: 'black',
              color: 'white',
              fontFamily: 'sans-serif',
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography>{item.value}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
    
              justifyContent: 'space-between',
            }}
          >
            {item.inputs.map((inputLabel, idx) => (
              <TextField
                key={idx}
                size="small"
                label={inputLabel}
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  flex: 1,
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Grid>
  ))}
  
</Grid>
<Divider sx={{ my: 2 }} />
<Grid container alignItems="center" justifyContent="center" spacing={1}>
  <Grid item xs={12} textAlign="center">
    <Button
      variant="contained"
      sx={{ 
        m: 1, 
        bgcolor: 'green', 
        '&:hover': { bgcolor: 'darkgreen' } 
      }}
    >
      Hold
    </Button>
    <Button
      variant="contained"
      sx={{ 
        m: 1, 
        bgcolor: 'blue', 
        '&:hover': { bgcolor: 'darkblue' } 
      }}
    >
      Pay & Save
    </Button>
    <Button
      variant="contained"
      sx={{ 
        m: 1, 
        bgcolor: 'red', 
        '&:hover': { bgcolor: 'darkred' } 
      }}
    >
      Reset
    </Button>
  </Grid>
</Grid>

    </Box>
  );
}
