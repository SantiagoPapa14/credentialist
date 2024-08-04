'use server';
import { Box, TextField, Button, Typography } from '@mui/material';
import { redirect } from "next/navigation";
import { login } from "@/lib/authLib";

export default async function LoginForm(){
    const handleLogin = async(credentials)=>{
        "use server";
        await login(credentials);
        redirect("/credentials");
    }

    return(
    <Box //Main form
        component="form"
        action={async(formData)=> {'use server'; await handleLogin(formData)}}
        noValidate
        sx={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            p: 3,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: 3,
        }}
    >
      <Typography variant="h5" component="h1" sx={{ //Title
            mb: 1, 
            textAlign: 'center', 
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '24px',
            color: '#333',
        }}>
        Credentialist
      </Typography>

      <TextField //Username Input
        required
        id="outlined-required"
        name="username"
        label="Username"
        defaultValue=""
        sx={{ mt: 3, mb: 2}}
      />
      <br></br>
      <TextField //Password Input
        required
        id="outlined-required"
        name="password"
        type='password'
        label="Password"
        defaultValue=""
        sx={{ mt: 3, mb: 2}}
      />
      <Button //Login Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
          >
            Sign In
      </Button>
    </Box>);
}