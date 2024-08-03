 
'use client';

import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box} from '@mui/material';

export default function ServiceAndUserDataGrid({ service, username }) {
    const [open, setOpen] = React.useState(false);
    var [selectedRow, setSelectedRow] = React.useState(null);
    selectedRow = {
        service: "",
        username:""
    }
    const handleButtonClick = (row) => {
        setSelectedRow(row);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
      };
      return(
 <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Insert master key"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box component="form" action={(formData) => { console.log(JSON.stringify(Object.fromEntries(formData)))}}>
                <TextField name='service' defaultValue={selectedRow.service} sx={{display:'none'}}/>
                <TextField name='username' defaultValue={selectedRow.username} sx={{display:'none'}}/>
                <TextField
                    required
                    id="outlined-required"
                    name="masterKey"
                    label="Encryption Key"
                    defaultValue=""
                    sx={{ mt: 3, mb: 2 }}
                />
                <br></br>
                <Button sx={{m:1}} variant="contained" onClick={handleClose} color="primary">
                Close
                </Button>
                <Button type="submit" sx={{m:1}} variant="contained" color="primary" autoFocus>
                Decrypt Password
                </Button>
            </Box>
          </DialogContentText>
        </DialogContent>       
      </Dialog>
      );
}