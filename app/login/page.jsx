'use client';
import { Box } from '@mui/material';
import LoginForm from "@/components/LoginForm";
import '@/styles/globals.css';

export default async function Home() {
  return (
    <Box className="fullscreen-background">
        <LoginForm></LoginForm>
    </Box>
  );
}
