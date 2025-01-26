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
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_PRODUCT_GROUP } from '../../../../graphQL/mutations';
import { GET_PRODUCT_GROUP_BY_ID } from '../../../../graphQL/queries';

export default function ProductGroupEdit() {
  const [groupName, setGroupName] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [rows, setRows] = useState([{ item: '', quantity: '', action: '' }]);
  const [branchId, setBranchId] = useState('60d0fe4f5311236168a109ca'); // Replace with actual branch ID

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: queryData, loading: queryLoading } = useQuery(GET_PRODUCT_GROUP_BY_ID, {
    variables: { id },
    onCompleted: (fetchedData) => {
      const productGroup = fetchedData.getProductGroupById;
      setGroupName(productGroup.groupName);
      setSearchProduct(productGroup.searchProduct);
      setRows(productGroup.products);
    },
  });

  const [editProductGroup, { loading }] = useMutation(EDIT_PRODUCT_GROUP, {
    onCompleted: () => {
      enqueueSnackbar('Product group updated successfully', { variant: 'success' });
      navigate(-1); // Navigate back to the previous page
    },
    onError: (error) => {
      console.error('Error updating product group:', error);
      enqueueSnackbar('Error updating product group', { variant: 'error' });
    },
  });

  const handleSubmit = async () => {
    try {
      const input = {
        branchId,
        groupName,
        searchProduct,
        products: rows.map(row => ({
          item: row.item,
          quantity: parseInt(row.quantity, 10),
          action: row.action,
        })),
      };

      console.log('Submitting data:', input);

      await editProductGroup({
        variables: {
          id,
          input,
        },
      });
    } catch (err) {
      console.error('Error updating product group:', err);
      enqueueSnackbar('Error updating product group', { variant: 'error' });
    }
  };

  const handleReset = () => {
    setGroupName('');
    setSearchProduct('');
    setRows([{ item: '', quantity: '', action: '' }]);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
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

  if (queryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Edit Product Group
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
                      label="Action"
                      value={row.action}
                      onChange={(e) => handleRowChange(index, 'action', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="text" color="error" onClick={() => removeRow(index)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {/* Add New Row */}
              <TableRow>
                <TableCell colSpan={4}>
                  <Button variant="text" color="primary" onClick={addRow}>
                    Add Product
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
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
