"use client";
import { Box } from "@mui/material";
import RegisterForm from "@/components/RegisterForm";
import '@/styles/globals.css';

const Register = () => {
  return (
    <Box
      sx={{
        //Background image and wrapper
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        backgroundImage: "url(/loginWallpaper.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <RegisterForm></RegisterForm>
    </Box>
  );
};

export default Register;