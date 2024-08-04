'use client';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ServiceAndUserDataGrid({ rows }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'service', headerName: 'Service', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
  ];
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRowSelection = (params) => {
    setSelectedRow(params.row);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOperation = async () => {
    if (selectedRow) {
      setLoading(true);
      setError(null);
      setSuccessMessage('');

      try {
        // Replace with your API endpoint and request details
        const queryParams = {
          service: selectedRow.service,
          username: selectedRow.username,
          masterKey: password,
        }
        const response = await fetch('/api/getDecrypted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(queryParams),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSuccessMessage('Password copied to clipboard!');
        await navigator.clipboard.writeText(data.password[0].password);
        console.log('Response data:', data.password);
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
        handleClose(); // Close the dialog
      }
    } else {
      console.log('No row selected');
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowClick={handleRowSelection}
        checkboxSelection={false}
        hideFooter
      />
      <Button
        onClick={handleClickOpen}
        disabled={!selectedRow || loading}
        variant='contained'
        sx={{margin:2}}        
      >
        {loading ? 'Processing...' : 'Decrypt'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Decryption Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Key"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={handleOperation}
            disabled={!password || loading}
          >
            Decrypt
          </Button>
        </DialogActions>
      </Dialog>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
