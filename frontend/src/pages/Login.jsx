// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { Box, Paper, Typography, TextField, InputAdornment, IconButton, Alert } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res = await api.post("/auth/login", data);
      if (res?.data?.token) {
        login(res.data.token, res.data.user || null);
        navigate("/dashboard");
      } else {
        setServerError("Login succeeded but no token returned.");
      }
    } catch (err) {
      setServerError(err?.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <Box className="page-hero">
      <Box className="container">
        <Paper className="glass-card auth-card" elevation={6}>
          <Box className="auth-left" aria-hidden>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Welcome back</Typography>
            <Typography className="subtitle">Sign in to manage appointments, consult online and order medicines.</Typography>
          </Box>

          <Box className="auth-form" component="section" aria-labelledby="login-heading">
            <Typography id="login-heading" variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Sign in</Typography>

            {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Email"
                placeholder="you@domain.com"
                fullWidth
                size="small"
                margin="dense"
                autoComplete="email"
                {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{ className: "mc-input" }}
              />

              <TextField
                label="Password"
                placeholder="Your password"
                fullWidth
                size="small"
                margin="dense"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  className: "mc-input",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(s => !s)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Box sx={{ mt: 2 }}>
                <button className="mc-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</button>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body2" className="small">New? <a href="/register">Create account</a></Typography>
                <Typography variant="body2" className="small"><a href="/forgot">Forgot?</a></Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}