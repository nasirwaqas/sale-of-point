import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Size,
  Item,
  Paper,
} from "@mui/material";
import { blue } from "@mui/material/colors";

export default function SaleInvoice() {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Example Product",
      purchasePrice: 100,
      inStock: 50,
      salePrice: 120,
      boxes: 5,
      boxesPrice: 600,
      quantity: 20,
      discount: "10%", // Percentage or fixed Rs value
      total: 1080,
    },
  ]);

  const calculateTotal = (salePrice, quantity, discount) => {
    const discountValue = discount.includes("%")
      ? (parseFloat(discount) / 100) * (salePrice * quantity)
      : parseFloat(discount);
    return salePrice * quantity - (discountValue || 0);
  };

  const handleInputChange = (e, rowId, field) => {
    const { value } = e.target;

    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === rowId) {
          const updatedRow = {
            ...row,
            [field]: field === "discount" ? value : parseFloat(value) || 0,
          };

          // Recalculate Total
          updatedRow.total = calculateTotal(
            updatedRow.salePrice,
            updatedRow.quantity,
            updatedRow.discount
          );

          return updatedRow;
        }
        return row;
      })
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* First Section */}
      <Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight="bold">
              Sale Invoice
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="contained" sx={{ m: 0.6 }}>
              Hold Invoice
            </Button>
            <Button variant="contained" sx={{ m: 0.7 }}>
              Recent Invoice
            </Button>
            <Button variant="contained" sx={{ m: 0.7 }}>
              Sale Return
            </Button>
            <Button variant="contained" sx={{ m: 0.4 }}>
              Settings
            </Button>
            <Button variant="contained" sx={{ m: 0.3 }}>
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Input Fields Row 1 */}
        <Grid container spacing={2}>
          <Grid item xs={2.3}>
            <TextField size="small" label="Product (Alt+P)" variant="outlined" />
          </Grid>
          <Grid item xs={2.3}>
            <TextField size="small" label="Code (Alt+C)" variant="outlined" />
          </Grid>
          <Grid item xs={2.3}>
            <TextField size="small" label="Customer" variant="outlined" />
          </Grid>
        </Grid>
      </Box>

      {/* Checkboxes and Discount Heading */}
      <Grid container alignItems="center" spacing={2} sx={{ my: 2 }}>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox />} label="Auto Print" />
          <FormControlLabel control={<Checkbox />} label="If Sale Return" />
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Discount for All Products
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr #</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Boxes</TableCell>
              <TableCell>Boxes Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Discount (Rs/%)</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.purchasePrice}</TableCell>
                <TableCell>{row.inStock}</TableCell>
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
                    value={row.boxes}
                    onChange={(e) => handleInputChange(e, row.id, "boxes")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={row.boxesPrice}
                    onChange={(e) => handleInputChange(e, row.id, "boxesPrice")}
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
                    value={row.discount}
                    onChange={(e) => handleInputChange(e, row.id, "discount")}
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
