import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Divider,
} from '@mui/material';

export default function PurchaseReturn  ()  {
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscountValue(value);
    if (discountType === '%') {
      setAmount((value / 100) * amount);
    } else {
      setAmount((value / amount) * 100);
    }
  };

  const toggleDiscountType = () => {
    setDiscountType((prev) => (prev === '%' ? 'rs' : '%'));
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
          <Grid item xs={2}>
            <TextField fullWidth label="Product (Alt+P)" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Code (Alt+C)" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Vendor (Alt+V)" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Customer" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Company Invoice#" variant="outlined" />
          </Grid>
        </Grid>

        {/* Input Fields Row 2 */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={3}>
            <TextField fullWidth label="Purchase Date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Second Section */}
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField fullWidth label="Total Quantities" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Total Amount" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Sub Total" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Tax (%)" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label={`Discount (${discountType})`}
              variant="outlined"
              value={discountValue}
              onChange={handleDiscountChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={toggleDiscountType}>
              Toggle Discount Type
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={2}>
            <TextField fullWidth label="Enter Amount" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Paid" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Balance" variant="outlined" />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Return" variant="outlined" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};


