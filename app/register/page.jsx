"use client";
import { Box } from "@mui/material";
import RegisterForm from "@/components/RegisterForm";
import '@/styles/globals.css';

const Register = () => {
  return (
    <Box className="fullscreen-background">
      <RegisterForm></RegisterForm>
    </Box>
  );
};

export default Register;