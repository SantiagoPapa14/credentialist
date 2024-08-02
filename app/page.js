import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/authLib";
import { Box, TextField, Button, Typography } from '@mui/material';
import '@/styles/globals.css';

export default async function Home() {
  const session = await getSession();
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      backgroundImage: 'url(/loginWallpaper.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
        <Box component="form" action={async (formData) => {
            "use server";
            await login(formData);
            redirect("/credentials");
          }} noValidate sx={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            p: 3,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: 3,
          }}>

          <Typography variant="h5" component="h1" sx={{ 
                mb: 1, 
                textAlign: 'center', 
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#333',
    }}>
            Credentialist
          </Typography>

          <TextField
            required
            id="outlined-required"
            name="username"
            label="Username"
            defaultValue=""
            sx={{ mt: 3, mb: 2}}
          />
          <br></br>
          <TextField
            required
            id="outlined-required"
            name="password"
            type='password'
            label="Password"
            defaultValue=""
            sx={{ mt: 3, mb: 2}}
          />
          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
              >
                Sign In
          </Button>
        </Box>
    </Box>
  );
}
