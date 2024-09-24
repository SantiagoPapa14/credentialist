'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

async function decryptPassword(row){
try {
        // Replace with your API endpoint and request details
        const response = await fetch('/api/protected/getEncrypted', {
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
        await navigator.clipboard.writeText(data.password);
        window.alert('Password copied to clipboard!');
      } catch (error) {
        console.log(error.message);
      }

}

export default function CredentialsTable({rows}) {
	return (
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
			onClick={()=>decryptPassword(row)}
			>
			Decrypt
			</Button>



			</TableCell>
			</TableRow>
		))}
		</TableBody>
		</Table>
		</TableContainer>
	);
}

