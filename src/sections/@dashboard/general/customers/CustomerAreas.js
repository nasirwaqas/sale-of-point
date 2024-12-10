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

export default function CustomerAreas() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    value: '',
    description: '',
    controlType: '',
  });

  const [records, setRecords] = useState([
    {
      type: 'Type1',
      name: 'Area 1',
      value: '100',
      description: 'Description for Area 1',
      controlType: 'number',
    },
    {
      type: 'Type2',
      name: 'Area 2',
      value: '200',
      description: 'Description for Area 2',
      controlType: 'checkbox',
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setRecords([...records, { ...formData }]);
    setFormData({ type: '', name: '', value: '', description: '', controlType: '' });
  };

  const handleEdit = (index) => {
    const recordToEdit = records[index];
    setFormData(recordToEdit);
  };

  const handleActivate = (index) => {
    alert(`Activated record at index ${index + 1}`);
  };

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
          <MenuItem value="Type1">Type1</MenuItem>
          <MenuItem value="Type2">Type2</MenuItem>
          <MenuItem value="Type3">Type3</MenuItem>
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.value}</TableCell>
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
                      color="success"
                      onClick={() => handleActivate(index)}
                    >
                      Activate
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
