import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container, Typography } from '@mui/material';

function Home(){
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Welcome to MediConnect</Typography>
      <Typography>Use the navigation to login or register and explore doctors.</Typography>
    </Container>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}