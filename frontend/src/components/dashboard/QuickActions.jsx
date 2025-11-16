// src/components/dashboard/QuickActions.jsx
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function QuickActions() {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="contained" color="primary" href="/doctors">Book Appointment</Button>
      <Button variant="outlined" color="primary" href="/upload">Upload Prescription</Button>
      <Button variant="text" color="inherit" href="/profile">My Profile</Button>
    </Box>
  );
}