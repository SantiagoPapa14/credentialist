'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import MyPopUp from "./decryptPopUp"

export default function ServiceAndUserDataGrid({ rows }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'service', headerName: 'Service', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    {
      field: 'action',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => ''}
        >
          Decrypt
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
      <MyPopUp></MyPopUp>
    </div>
  );
}
