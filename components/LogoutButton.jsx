import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';

export default function LogoutButton(){
  const router = useRouter();

    const handleLogout = async () => {
        try {
            // Call the logout API route to clear the cookie
            const response = await fetch('/api/logout', {
                method: 'GET',
            });

            if (response.ok) {
                // Redirect to the login page or any other route after logout
                router.push('/login');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return(
        <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleLogout}
              sx={{ mr: 2 }}
            >
              <LockIcon />
            </IconButton>
          </Box>
    );
}