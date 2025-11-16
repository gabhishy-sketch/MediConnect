// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

import StatCard from "../components/dashboard/StatCard";
import AppointmentCard from "../components/dashboard/AppointmentCard";
import QuickActions from "../components/dashboard/QuickActions";

import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ appointments: 0, doctors: 0, orders: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        // fetch appointments (user-specific) - adjust path if your API is different
        const [apRes, stRes] = await Promise.all([
          api.get("/appointments"), // returns array of upcoming appointments
          // hypothetic endpoint for counts (or you can compute locally)
          api.get("/stats/dashboard") // { appointments: n, doctors: n, orders: n }
        ]);

        if (!mounted) return;

        setAppointments(Array.isArray(apRes.data) ? apRes.data : []);
        setStats(stRes.data || { appointments: (apRes.data || []).length, doctors: 0, orders: 0 });
      } catch (err) {
        console.error("Dashboard load error", err);
        setError(err?.response?.data?.message || err.message || "Failed to load dashboard data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();

    return () => { mounted = false; };
  }, []);

  return (
    <Box className="mc-dashboard page-hero">
      <Box className="container">
        <Paper className="db-header" elevation={0}>
          <Box className="db-header-left">
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
              Good day{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
            </Typography>
            <Typography className="subtitle">Quick summary of your activity and upcoming appointments.</Typography>
          </Box>

          <Box className="db-header-right">
            <QuickActions />
          </Box>
        </Paper>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <StatCard title="Appointments" value={stats.appointments} subtitle="Upcoming" color="#1565c0" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Doctors" value={stats.doctors} subtitle="Available" color="#00acc1" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Orders" value={stats.orders} subtitle="Pharmacy" color="#1e88e5" />
          </Grid>
        </Grid>

        <Paper className="db-panel" elevation={0} sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Upcoming appointments</Typography>

          {loading ? (
            <Box className="centered" sx={{ py: 6 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box className="centered" sx={{ py: 6 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : appointments.length === 0 ? (
            <Box className="empty-state" sx={{ py: 6 }}>
              <Typography variant="body1">No upcoming appointments. Book your first appointment to get started.</Typography>
              <QuickActions />
            </Box>
          ) : (
            <Box>
              {appointments.map((a) => (
                <AppointmentCard key={a._id ||` ${a.id || a.date}`} appointment={a} />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}