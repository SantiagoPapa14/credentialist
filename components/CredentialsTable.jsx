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
import DecryptDialog from './DecryptDialog';

export default function CredentialsTable({ rows }) {
  const [credential, setCredential] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickDecrypt = (credential) => {
	setCredential(credential);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
	setCredential(null);
    setOpenDialog(false);
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
            {rows.map((credential) => (
              <TableRow
                key={credential.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{credential.service}</TableCell>
                <TableCell component="th" scope="row">
                  {credential.username}
                </TableCell>
                <TableCell>*****************</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleClickDecrypt(credential);
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

      <DecryptDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        credential={credential}
      />
    </>
  );
}
