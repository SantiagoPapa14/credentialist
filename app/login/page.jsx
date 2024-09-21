'use server';
import { Box } from '@mui/material';
import LoginFormNew from "@/components/LoginFormNew";
import '@/styles/globals.css';

export default async function Home() {
  return (
    <Box sx={{ //Background image and wrapper
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
        <LoginFormNew></LoginFormNew>
    </Box>
  );
}
