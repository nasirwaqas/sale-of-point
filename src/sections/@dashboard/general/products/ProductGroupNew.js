import React, { useState } from 'react';
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TextField,
  Typography,
  Box,
} from '@mui/material';

export default function NewProductGroup() {
  const [groupName, setGroupName] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [rows, setRows] = useState([{ item: '', quantity: '', action: '' }]);

  // Handlers
  const handleSubmit = () => {
    console.log('Submit clicked', { groupName, searchProduct, rows });
  };

  const handleReset = () => {
    setGroupName('');
    setSearchProduct('');
    setRows([{ item: '', quantity: '', action: '' }]);
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { item: '', quantity: '', action: '' }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        New Product Group
      </Typography>

      <Card sx={{ p: 3 }}>
        {/* Table */}
        <TableContainer>
          <Table>
            <TableBody>
              {/* First Row: Group Name and Search Product */}
              <TableRow>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    label="Search Product"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                  />
                </TableCell>
              </TableRow>

              {/* Dynamic Rows: Item, Quantity, and Action */}
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      label="Item"
                      value={row.item}
                      onChange={(e) => handleRowChange(index, 'item', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      label="action"
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleRowChange(index, 'action', e.target.value)}
                    />
                  </TableCell>
                 
                </TableRow>
              ))}

              {/* Add New Row */}
              
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" color="warning" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="text" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
