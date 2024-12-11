import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
} from '@mui/material';

const ExpenseTypes = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Expense Types</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Example Row */}
            <TableRow>
              <TableCell>Salary</TableCell>
              <TableCell>Monthly salary Expense</TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary">Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Expense Types Information</h3>
          <form>
            <TextField
              label="Type"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ExpenseTypes;
