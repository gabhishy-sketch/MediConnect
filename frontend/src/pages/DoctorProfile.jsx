import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { formatDateTime } from "../utils/date";

export default function DoctorProfile(){
  const { id } = useParams();
  const { data: doctor, loading, error } = useFetch(`/doctors/${id}`, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !doctor) return <div>Error loading doctor</div>;

  return (
    <Box className="page-hero container">
      <Typography variant="h4" sx={{ mb:1 }}>{doctor.name}</Typography>
      <Typography className="subtitle">{doctor.specialization} • {doctor.hospital}</Typography>

      <Box sx={{ mt:2 }}>
        <Typography variant="h6">About</Typography>
        <Typography>{doctor.bio || "No bio available."}</Typography>
      </Box>

      <Box sx={{ mt:3 }}>
        <Typography variant="h6">Availability</Typography>
        {doctor.availability?.length ? (
          <ul>
            {doctor.availability.map((a, i) => <li key={i}>{formatDateTime(a)}</li>)}
          </ul>
        ) : <Typography className="small">No public availability</Typography>}
      </Box>

      <Box sx={{ mt:3 }}>
        <Button variant="contained" href={`/book/${doctor._id}`}>Book Appointment</Button>
        <Button variant="outlined" sx={{ ml:1 }} component={Link} to="/doctors">Back</Button>
      </Box>
    </Box>
  );
}