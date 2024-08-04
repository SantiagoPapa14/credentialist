'use server';
import { redirect } from "next/navigation";
import {logout} from "./../lib/authLib";
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';

export default async function LogoutButton(){
    return(
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
    );
}