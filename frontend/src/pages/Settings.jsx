import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Settings(){
  return (
    <Box className="page-hero container">
      <Typography variant="h4">Settings</Typography>
      <Typography className="small" sx={{ mt:2 }}>Notification preferences and security settings go here.</Typography>
    </Box>
  );
}