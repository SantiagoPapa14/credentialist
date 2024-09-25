'use client'
import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {decrypt} from "/lib/cryptoLib";
async function decryptPassword(row, key){
try {
        // Replace with your API endpoint and request details
        const response = await fetch('/api/getEncrypted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(row),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
		const decryptedPassword = decrypt(data.password, key)
        await navigator.clipboard.writeText(decryptedPassword);
        window.alert('Password copied to clipboard!');
      } catch (error) {
        console.log(error.message);
      }

}

export default function CredentialsTable({rows}) {
	const [credential, setCredential] = useState(null);
	const [open, setOpen] = useState(false);
  	const [key, setKey] = useState('');
	const handleClickOpen = () => {
		setOpen(true);
	  };
	
	  const handleClose = () => {
		setOpen(false);
		setKey('');
		setCredential(null);
	  };

	  const handleKeyChange = (event) => {
		setKey(event.target.value);
	  };
	
	return (
		<>
		<TableContainer component={Paper}>
		<Table sx={{ minWidth: 650 }} aria-label="simple table">
		<TableHead>
		<TableRow>
		<TableCell>Service</TableCell>
		<TableCell>Username</TableCell>	
		<TableCell>Password</TableCell>  
		<TableCell align="right"></TableCell>
		</TableRow>
		</TableHead>
		<TableBody>
		{rows.map((row) => (
			<TableRow
			key={row.id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>

			<TableCell>{row.service}</TableCell>
			<TableCell  component="th" scope="row">
			{row.username}
			</TableCell>
			<TableCell>*****************</TableCell>
			<TableCell align="right">

			<Button
			variant='contained'
			onClick={()=>{
				setCredential(row);
				handleClickOpen();
			}}
			>
			Decrypt
			</Button>



			</TableCell>
			</TableRow>
		))}
		</TableBody>
		</Table>
		</TableContainer>



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
            value={key}
            onChange={handleKeyChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={()=>decryptPassword(credential, key)}
            disabled={!key}
          >
            Decrypt
          </Button>
        </DialogActions>
      </Dialog>
		</>
		
	);
}

