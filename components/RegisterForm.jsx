import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";


const handleRegister = async (formData, router) => {
  try {
    console.log("Form data:", formData);
    const response = await fetch("https://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status == 201) {
      router.push("/login");
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const LoginForm = () => {
  const router = useRouter();
  return (
    <Box
      component="form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = {
          username: (form.elements.namedItem("username"))
            .value,
          password: (form.elements.namedItem("password"))
            .value,
        };
        await handleRegister(formData, router);
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        p: 3,
        bgcolor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 1,
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "24px",
          color: "#333",
        }}
      >
        Credentialist
      </Typography>

      <TextField
        required
        id="outlined-required"
        name="username"
        label="New Username"
        defaultValue=""
        sx={{ mt: 3, mb: 2 }}
      />
      <br />
      <TextField
        required
        id="outlined-required"
        name="password"
        type="password"
        label="New Password"
        defaultValue=""
        sx={{ mt: 3, mb: 2 }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      <Link href="/login">Already have an account?</Link>
    </Box>
  );
};

export default LoginForm;