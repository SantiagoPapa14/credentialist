import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddPasswordButton from "@/components/AddPasswordButton";
import LogoutButton from "./LogoutButton";
import Box from '@mui/material/Box';

export default function MyToolBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <LogoutButton></LogoutButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Credentialist
            </Typography>

            <AddPasswordButton></AddPasswordButton>

          </Toolbar>
          </AppBar>
        </Box>
    );
  }