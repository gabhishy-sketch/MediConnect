// src/components/dashboard/StatCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function StatCard({ title, value = 0, subtitle = "", color = "#1565c0" }) {
  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>{value}</Typography>
          {subtitle && <Typography className="small" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
        </Box>

        <Box className="stat-badge" sx={{ background: color, color: "#fff", borderRadius: 1, px: 2, py: 1, fontWeight: 700 }}>
          {String(value).slice(0, 3)}
        </Box>
      </Box>
    </Paper>
  );
}