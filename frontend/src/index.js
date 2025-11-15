import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// MUI theme (keeps CSS but MUI components will look consistent)
const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#00acc1' },
    background: { default: '#f6fbff' }
  },
  typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' }
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);