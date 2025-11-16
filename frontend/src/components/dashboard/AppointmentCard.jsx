// src/components/dashboard/AppointmentCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AppointmentCard({ appointment }) {
  // expected shape: { _id, doctorName, specialization, datetime, location, status }
  const dt = appointment.datetime || appointment.date || appointment.scheduledAt;
  const when = dt ? new Date(dt).toLocaleString() : "TBD";
  const doctor = appointment.doctorName || appointment.doctor?.name || "Doctor";
  const specialization = appointment.specialization || appointment.doctor?.specialization || "";

  return (
    <Paper elevation={1} sx={{ p: 2, mt: 1, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{doctor}</Typography>
          <Typography className="small" sx={{ color: "text.secondary" }}>{specialization || appointment.location || ""}</Typography>
          <Typography sx={{ mt: 1 }}>{when}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" href={`/doctors/${appointment.doctorId || appointment.doctor?._id || ""}`}>View</Button>
          <Button variant="contained" size="small" color="primary">Join</Button>
        </Box>
      </Box>
    </Paper>
  );
}