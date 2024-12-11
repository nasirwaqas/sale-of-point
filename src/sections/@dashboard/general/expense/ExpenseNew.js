import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem } from '@mui/material';

const ExpenseNew = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Expense saved!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Expense Information</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
        <TextField
          select
          label="Expense Type"
          variant="outlined"
          fullWidth
        >
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Investment">Investment</MenuItem>
        </TextField>
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          fullWidth
        />
      </div>

      <div style={{ marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
        <TextField
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default ExpenseNew;
