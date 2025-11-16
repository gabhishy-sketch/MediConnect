import React from "react";
import useFetch from "../hooks/useFetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Orders() {
  const { data, loading, error } = useFetch("/orders", []);
  return (
    <Box className="page-hero container">
      <Typography variant="h4">Orders</Typography>
      {loading ? <div>Loading...</div> : error ? <div>Error</div> : (data || []).map(o => (
        <Paper key={o._id} sx={{ p:2, mt:2 }}>
          <Typography variant="subtitle1">Order #{o._id}</Typography>
          <Typography className="small">{o.status} — {new Date(o.createdAt).toLocaleString()}</Typography>
        </Paper>
      ))}
    </Box>
  );
}