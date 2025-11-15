import React, { useState, useContext } from 'react';
import { Paper, Box, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Register(){
  const { register: authRegister } = useContext(AuthContext);
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({ defaultValues:{ role:'patient' } });
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await api.post('/auth/register', data);
      authRegister(res.data.token, res.data.user || null);
    } catch (err) {
      setServerError(err.response?.data?.msg || err.message || 'Registration failed');
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
                <Typography className="h1">Create your account</Typography>
                <Typography className="lead">Join MediConnect to book doctors and order medicines online.</Typography>
              </div>
            </div>
          </div>

          <div className="auth-form">
            <Typography variant="h5" sx={{mb:1, fontWeight:700}}>Register</Typography>
            {serverError && <Alert severity="error" sx={{mb:1}}>{serverError}</Alert>}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField label="Full name" variant="outlined" size="small" fullWidth {...register('name',{required:'Name required'})} error={!!errors.name} helperText={errors.name?.message} sx={{mb:2}} />
              <TextField label="Email" variant="outlined" size="small" fullWidth {...register('email',{required:'Email required'})} error={!!errors.email} helperText={errors.email?.message} sx={{mb:2}} />
              <TextField label="Password" variant="outlined" size="small" fullWidth type="password" {...register('password',{required:'Password required'})} error={!!errors.password} helperText={errors.password?.message} sx={{mb:2}} />
              <TextField label="Role (patient/doctor/pharmacist)" variant="outlined" size="small" fullWidth {...register('role',{required:true})} sx={{mb:2}} />
              <button className="btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create account'}</button>
            </Box>
          </div>
        </Paper>
      </div>
    </div>
  );
}