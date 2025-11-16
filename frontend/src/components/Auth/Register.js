import React, { useState, useContext } from 'react';
import { Box, Paper, Typography, TextField, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register: rhf, handleSubmit, formState:{ errors, isSubmitting } } = useForm();
  const [serverError,setServerError] = useState('');
  const [successMsg,setSuccessMsg] = useState('');

  const onSubmit = async (data) => {
    setServerError(''); setSuccessMsg('');
    try {
      const res = await api.post('/auth/register', data);
      if (res?.data?.token) {
        login(res.data.token, res.data.user || null);
        navigate('/dashboard');
      } else {
        setSuccessMsg('Registered successfully. Please login.');
      }
    } catch (err) {
      setServerError(err?.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <Box className="page-hero">
      <Box className="container">
        <Paper className="glass-card auth-card fade-in" elevation={6} sx={{display:'grid', gridTemplateColumns:{xs:'1fr', md:'1fr 1fr'}, gap:3}}>
          <Box sx={{p:2}} aria-hidden>
            <Typography variant="h4" sx={{fontWeight:800}}>Create your account</Typography>
            <Typography className="subtitle">Register as patient, doctor or pharmacist.</Typography>
          </Box>

          <Box sx={{p:2}}>
            <Typography variant="h6" sx={{mb:2, fontWeight:700}}>Register</Typography>
            {serverError && <Alert severity="error">{serverError}</Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField label="Full name" fullWidth size="small" margin="dense" {...rhf('name',{required:'Name required'})} error={!!errors.name} helperText={errors.name?.message}/>
              <TextField label="Email" fullWidth size="small" margin="dense" {...rhf('email',{required:'Email required', pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:'Invalid'}})} error={!!errors.email} helperText={errors.email?.message}/>
              <TextField label="Password" type="password" fullWidth size="small" margin="dense" {...rhf('password',{required:'Password required', minLength:{value:6,message:'Min 6'}})} error={!!errors.password} helperText={errors.password?.message}/>
              <TextField label="Role" fullWidth size="small" margin="dense" defaultValue="patient" {...rhf('role')} helperText="patient | doctor | pharmacist" />

              <Box sx={{mt:2}}>
                <button className="mc-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating…' : 'Create account'}</button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}