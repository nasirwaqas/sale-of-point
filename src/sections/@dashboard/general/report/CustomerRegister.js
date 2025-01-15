import React, { useRef } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'customerName', label: 'Name', align: 'left' },
  { id: 'customerPhone', label: 'Phone', align: 'left' },
  { id: 'customerReciveable', label: 'Reciveable', align: 'left' },
  { id: 'customerPayable', label: 'Payable', align: 'left' },
];

const data = [
  {
    customerName: "John Doe",
    customerPhone: "9230393839",
    customerReciveable: "12345-6789012-3",
    customerPayable: "8579827",
  },
  {
    customerName: "Jane Smith",
    customerPhone: "929393939",
    customerReciveable: "98765-4321098-7",
    customerPayable: "298509",
  },
  {
    customerName: "Mike Brown",
    customerPhone: "Contact",
    customerReciveable: "54321-0987654-1",
    customerPayable: "2578",
  },
];

export default function CustomerRegister() {
  const tableRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      {/* Heading and Print Button Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}
      >
        <Typography variant="h4" component="h1">
          Customer Register
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePrint}
        >
          Print
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} ref={tableRef} className="printable-content">
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map((head) => (
                <TableCell key={head.id} align={head.align}>
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.customerPhone}</TableCell>
                <TableCell>{row.customerReciveable}</TableCell>
                <TableCell>{row.customerPayable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CSS for Print */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-content, .printable-content * {
            visibility: visible;
          }
          .printable-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
    </Box>
  );
}