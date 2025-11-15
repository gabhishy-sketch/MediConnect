import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function NavBar(){
  const { user, logout } = useContext(AuthContext);
  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
            MediConnect
          </Typography>
          <Box>
            <Button component={RouterLink} to="/doctors" color="inherit">Doctors</Button>
            {user ? (
              <>
                <Button component={RouterLink} to="/my-appointments" color="inherit">My Appts</Button>
                <Button onClick={logout} color="inherit">Logout</Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/login" color="inherit">Login</Button>
                <Button component={RouterLink} to="/register" color="inherit">Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}