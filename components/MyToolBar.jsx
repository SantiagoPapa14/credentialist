'use server';
import { redirect } from "next/navigation";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import AddPasswordButton from "@/components/AddPasswordButton";
import {logout} from "./../lib/authLib";

export default async function MyToolBar({ children }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Box component="form" action={async () =>{
            'use server';
            await logout();
            redirect("/login");
          }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              type='submit'
              sx={{ mr: 2 }}
            >
              <LockIcon />
            </IconButton>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Credentialist
            </Typography>
            <AddPasswordButton></AddPasswordButton>
          </Toolbar>
          </AppBar>
        </Box>
    );
  }