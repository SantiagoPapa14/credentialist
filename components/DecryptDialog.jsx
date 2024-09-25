'use client'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { decrypt } from '/lib/cryptoLib';

async function decryptPassword(credential, key) {
    try {
      const response = await fetch('/api/getEncrypted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const decryptedPassword = decrypt(data.password, key);
      await navigator.clipboard.writeText(decryptedPassword);
      window.alert('Password copied to clipboard!');
    } catch (error) {
      console.log(error.message);
    }
  }

export default function DecryptDialog({ open, handleClose, credential }) {
  const [key, setKey] = useState('');
  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const closeDialog = () => {
    setKey('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Enter Decryption Key</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Key"
          type="password"
          fullWidth
          variant="standard"
          value={key}
          onChange={handleKeyChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
        <Button
          onClick={async () => {
            await decryptPassword(credential, key);
            closeDialog();

          }}
          disabled={!key}
        >
          Decrypt
        </Button>
      </DialogActions>
    </Dialog>
  );
}
