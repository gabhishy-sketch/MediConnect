import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DoctorCard from "../components/doctors/DoctorCard";
import "../styles/doctors.css";

export default function Doctors() {
  const { data: doctors, loading, error } = useFetch("/doctors", []);
  const [q, setQ] = useState("");
  const [special, setSpecial] = useState("");

  const list = (doctors || []).filter(d => {
    const matchQ = q ? (d.name || "").toLowerCase().includes(q.toLowerCase()) : true;
    const matchS = special ? (d.specialization || "").toLowerCase().includes(special.toLowerCase()) : true;
    return matchQ && matchS;
  });

  return (
    <Box className="page-hero">
      <div className="container">
        <Typography variant="h4" sx={{ mb: 1 }}>Doctors</Typography>
        <Typography className="subtitle" sx={{ mb: 2 }}>Find doctors by specialization and availability.</Typography>

        <Box sx={{ display: "flex", gap: 10, mb: 2, flexWrap: "wrap" }}>
          <TextField size="small" placeholder="Search name, hospital..." value={q} onChange={e=>setQ(e.target.value)} />
          <TextField size="small" placeholder="Specialization (cardio, derm...)" value={special} onChange={e=>setSpecial(e.target.value)} />
        </Box>

        {loading ? <div>Loading...</div> : error ? <div>Error loading doctors</div> :
          <Grid container spacing={2}>
            {list.map(d => <Grid item xs={12} md={6} lg={4} key={d._id}><DoctorCard doctor={d} /></Grid>)}
          </Grid>
        }
      </div>
    </Box>
  );
}