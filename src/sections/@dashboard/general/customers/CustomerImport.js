import React, { useState } from 'react';
import { Box, Typography, Button, Input } from '@mui/material';

export default function CustomerImport() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading: ${selectedFile.name}`);
    } else {
      alert('No file selected. Please choose a file to upload.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, gap: 2 }}>
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6">Customer Import</Typography>
      </Box>

      {/* Center Content */}
      <Box
        sx={{
          textAlign: 'center',
          border: '1px dashed #ccc',
          padding: 3,
          borderRadius: 1,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h6">Import Customers From Excel</Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {selectedFile ? selectedFile.name : 'No file chosen'}
        </Typography>

        <Button
          component="label"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Choose File
          <Input
            type="file"
            hidden
            onChange={handleFileChange}
            accept=".xlsx, .xls"
          />
        </Button>
      </Box>

      {/* Upload Button */}
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </Box>
  );
}
