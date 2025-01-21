import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Paper,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_CUSTOMER_AREA, EDIT_CUSTOMER_AREA } from '../../../../graphQL/mutations';
import { GET_CUSTOMER_AREAS_BY_BRANCH } from '../../../../graphQL/queries';

export default function CustomerAreas() {
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    name: '',
    value: '',
    description: '',
    controlType: '',
  });

  const branchId = '60d0fe4f5311236168a109ca'; // Replace with actual branch ID

  const { loading, error: queryError, data: queryData, refetch } = useQuery(GET_CUSTOMER_AREAS_BY_BRANCH, {
    variables: { branchId },
  });

  const [createCustomerArea] = useMutation(CREATE_CUSTOMER_AREA);
  const [editCustomerArea] = useMutation(EDIT_CUSTOMER_AREA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const { id, type, name, value, description, controlType } = formData;
      const status = 'active'; // Replace with actual status value

      if (id) {
        // Edit existing customer area
        await editCustomerArea({
          variables: {
            id,
            type,
            name,
            value,
            description,
            controlType,
            status,
            branchId,
          },
        });
      } else {
        // Create new customer area
        await createCustomerArea({
          variables: {

            type,
            name,
            value,
            description,
            controlType,
            status,
            branchId,
          },
        });
      }

      setFormData({ id: '', type: '', name: '', value: '', description: '', controlType: '' });
      refetch();
    } catch (mutationError) {
      console.error('Error saving customer area:', mutationError);
    }
  };

  const handleEdit = (index) => {
    const recordToEdit = queryData.getCustomerAreasByBranch[index];
    setFormData(recordToEdit);
  };

  const handleStatusToggle = async (index) => {
    const record = queryData.getCustomerAreasByBranch[index];
    const newStatus = record.status === 'active' ? 'deactive' : 'active';

    try {
      await editCustomerArea({
        variables: {
          id: record.id,
          status: newStatus,
        },
      });
      refetch();
    } catch (mutationError) {
      console.error('Error updating status:', mutationError);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (queryError) return <p>Error loading data</p>;

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Form Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">Customer Areas</Typography>
        <TextField
          select
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Customer Area1">Customer Area1</MenuItem>
          <MenuItem value="Customer Area2">Customer Area2</MenuItem>
          <MenuItem value="Customer Area3">Customer Area3</MenuItem>
        </TextField>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          select
          label="Control Type"
          name="controlType"
          value={formData.controlType}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="textarea">Textarea</MenuItem>
          <MenuItem value="select">Select</MenuItem>
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" size="small" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>

      {/* Table Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Customer Areas Record
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queryData.getCustomerAreasByBranch.map((record, index) => (
                <TableRow key={record.id}>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.value}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color={record.status === 'active' ? 'success' : 'warning'}
                      onClick={() => handleStatusToggle(index)}
                    >
                      {record.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}