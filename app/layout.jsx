import { Inter } from "next/font/google";
import '@/styles/globals.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import AddPasswordButton from "@/components/AddPasswordButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Credentialist",
  description: "Secure password manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LockIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Credentialist
          </Typography>
          <AddPasswordButton></AddPasswordButton>
        </Toolbar>
        </AppBar>
      </Box>
        {children}
      </body>
    </html>
  );
}
