import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { formatDateTime } from "../../utils/date";

export default function DoctorCard({ doctor }) {
  const nextAvail = doctor?.availability?.[0] || null;
  return (
    <Paper sx={{ p:2, borderRadius:2 }}>
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight:700 }}>{doctor.name}</Typography>
          <Typography className="small">{doctor.specialization}</Typography>
          <Typography className="small" sx={{ mt:1 }}>{doctor.hospital || doctor.clinic || ""}</Typography>
        </Box>

        <Box sx={{ textAlign:"right" }}>
          <Typography className="small">Next</Typography>
          <Typography sx={{ fontWeight:700 }}>{nextAvail ? formatDateTime(nextAvail) : "—"}</Typography>
          <Box sx={{ mt:1 }}>
            <Button variant="outlined" size="small" href={`/doctors/${doctor._id}`}>View</Button>
            <Button variant="contained" size="small" href={`/book/${doctor._id}} sx={{ ml:1 }`}>Book</Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}