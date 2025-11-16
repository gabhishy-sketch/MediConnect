import React, { useState, useContext } from 'react';
import { Box, Paper, Typography, TextField, InputAdornment, IconButton, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await api.post('/auth/login', data); // adjust endpoint
      if (res?.data?.token) {
        login(res.data.token, res.data.user || null);
        navigate('/dashboard');
      } else {
        setServerError('No token returned from server.');
      }
    } catch (err) {
      setServerError(err?.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <Box className="page-hero">
      <Box className="container">
        <Paper className="glass-card auth-card fade-in" elevation={6} sx={{display:'grid', gridTemplateColumns:{xs:'1fr', md:'1fr 1fr'}, gap:3}}>
          <Box sx={{p:2}} aria-hidden>
            <Typography variant="h4" sx={{fontWeight:800}}>Welcome back</Typography>
            <Typography className="subtitle">Sign in to manage appointments, consult online and order medicines.</Typography>
          </Box>

          <Box sx={{p:2}}>
            <Typography variant="h6" sx={{mb:2, fontWeight:700}}>Sign in</Typography>
            {serverError && <Alert severity="error" sx={{mb:2}}>{serverError}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Email"
                fullWidth size="small" margin="dense"
                {...register('email', { required: 'Email required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{ className:'mc-input' }}
              />

              <TextField
                label="Password"
                fullWidth size="small" margin="dense"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password required', minLength: { value:6, message:'Min 6 chars' } })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  className:'mc-input',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(v => !v)} edge="end" aria-label="toggle password">
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Box sx={{mt:2}}>
                <button className="mc-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
              </Box>
              <Box sx={{mt:2}}>
                <Typography variant="body2" className="small">New? <a href="/register">Create an account</a></Typography>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}