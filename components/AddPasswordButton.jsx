'use client';
import React, { useState } from 'react';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { encrypt } from "@/lib/cryptoLib";
import '@/styles/globals.css';

import { useRouter } from 'next/navigation'; // Updated import

export default function AddPasswordButton() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [key, setKey] = useState('');
    const [password, setPassword] = useState('');
    const [service, setService] = useState('');

    const router = useRouter(); // Updated useRouter

    // Function to handle opening the popup
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to handle closing the popup
    const handleClose = () => {
        setOpen(false);
        setUsername('');
        setKey('');
        setPassword('');
        setService('');
    };

    // Function to handle input changes
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleKeyChange = (event) => {
        setKey(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
    };

    // Function to handle submit
    const handleSubmit = async () => {
        const encryptedPass = encrypt(password, key);
        const payload = {
            service,
            username,
            encryptedPass,
        };

        try {
            const response = await fetch('/api/uploadPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                window.alert('Password uploaded successfully');
                window.location.reload();
            } else {
                window.alert('Failed to upload password');
            }
        } catch (error) {
            window.alert('Failed to upload password');
            console.log(error.message);
        }

        // Close the popup after submit
        handleClose();
    };

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleClickOpen}
                sx={{ mr: 2 }}
            >
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Password Required"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add password to database.</DialogContentText>
                    <TextField
                        margin="dense"
                        label="Service"
                        type="text"
                        fullWidth
                        value={service}
                        onChange={handleServiceChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        margin="dense"
                        label="Key"
                        type="text"
                        fullWidth
                        value={key}
                        onChange={handleKeyChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
