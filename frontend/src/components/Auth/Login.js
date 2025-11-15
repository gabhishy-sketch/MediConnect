import React, { useState, useContext } from 'react';
import { Paper, Box, Typography, TextField, InputAdornment, IconButton, Alert, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Login(){
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm();
  const [show, setShow] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user || null);
    } catch (err) {
      setServerError(err.response?.data?.msg || err.message || 'Login failed');
    }
  };

  return (
    <div className="app-hero">
      <div className="container-lg">
        <div className="topbar" role="banner">
          <div className="brand"><div className="logo">MC</div><div>MediConnect</div></div>
          <div style={{display:'flex',gap:12}}>
            <a href="/doctors" style={{color:'#fff',textDecoration:'none',fontWeight:600}}>Doctors</a>
            <a href="/login" style={{color:'#fff',textDecoration:'none'}}>Login</a>
            <a href="/register" style={{color:'#fff',textDecoration:'none'}}>Register</a>
          </div>
        </div>

        <Paper className="auth-card" elevation={8}>
          <div className="auth-left">
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <div className="logo">MC</div>
              <div>
                <Typography className="h1">MediConnect</Typography>
                <Typography className="lead">Book appointments, consult online and order medicines with verification.</Typography>
              </div>
            </div>
            <Box sx={{mt:2}}>
              <Typography variant="subtitle2" sx={{fontWeight:700}}>Secure & Fast</Typography>
              <Typography className="small">Protected by industry standard security. Quick scheduling & pharmacy integration.</Typography>
            </Box>
          </div>

          <div className="auth-form">
            <Typography variant="h5" sx={{mb:1, fontWeight:700}}>Sign in</Typography>
            {serverError && <Alert severity="error" sx={{mb:1}}>{serverError}</Alert>}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                {...register('email', { required: 'Email required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{ className:'input' }}
                sx={{mb:2}}
              />

              <TextField
                label="Password"
                variant="outlined"
                size="small"
                fullWidth
                type={show ? 'text' : 'password'}
                {...register('password', { required: 'Password required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  className:'input',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={()=>setShow(s=>!s)}>
                        {show ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{mb:2}}
              />

              <button className="btn" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>

              <Grid container justifyContent="space-between" alignItems="center" sx={{mt:2}}>
                <Grid item><Typography className="small">New? <a href="/register">Create account</a></Typography></Grid>
                <Grid item><Typography className="small"><a href="#">Forgot?</a></Typography></Grid>
              </Grid>
            </Box>
          </div>
        </Paper>
      </div>
    </div>
  );
}