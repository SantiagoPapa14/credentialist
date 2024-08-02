import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/authLib";
import { selectCredentials } from "@/lib/sqlLib";
import { Box, TextField, Button, Typography } from '@mui/material';
import '@/styles/globals.css';

export default async function Home() {
  const session = await getSession();
    if(session == null || session == undefined){
        redirect("/");
        return null;
    }else if(session.hasLogged == 1404039529){
        const passwords = await selectCredentials();
        return (
            <Typography variant="h5" component="h1" sx={{ 
                mb: 1, 
                textAlign: 'center', 
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#333',
            }}>
            {JSON.stringify(passwords)}
        </Typography>
        );
    }
}
