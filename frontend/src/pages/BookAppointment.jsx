import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";

export default function BookAppointment() {
  const { id } = useParams(); // doctor id optional
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // if doctor id provided, fetch doctor
  const { data: doctor } = useFetch(id ? `/doctors/${id} `:` /doctors`, [id]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(()=> {
    if (!user) {
      // optional: redirect to login
    }
  }, [user]);

  async function submit(e){
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const payload = {
        doctorId: id || (doctor?._id),
        datetime: new Date(`${date}T${time}`).toISOString(),
        notes
      };
      const res = await api.post("/appointments", payload);
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || error.message || "Booking failed");
    } finally { setLoading(false); }
  }

  return (
    <Box className="page-hero container">
      <Typography variant="h4" sx={{ mb: 1 }}>Book Appointment</Typography>
      <Typography className="subtitle" sx={{ mb:2 }}>{doctor?.name ? `Booking with ${doctor.name}` : "Choose time and doctor"}</Typography>

      <form onSubmit={submit}>
        <Box sx={{ display:"grid", gap:2, maxWidth:480 }}>
          <TextField label="Date" type="date" InputLabelProps={{ shrink:true }} value={date} onChange={e=>setDate(e.target.value)} required />
          <TextField label="Time" type="time" InputLabelProps={{ shrink:true }} value={time} onChange={e=>setTime(e.target.value)} required />
          <TextField label="Notes" multiline rows={3} value={notes} onChange={e=>setNotes(e.target.value)} />
          {err && <div style={{ color:"red" }}>{err}</div>}
          <Button variant="contained" type="submit" disabled={loading}>{loading ? "Booking…" : "Confirm booking"}</Button>
        </Box>
      </form>
    </Box>
  );
}