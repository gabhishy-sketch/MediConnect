import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from "../api/api";

export default function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!file) return setStatus("Please choose a file.");
    const fd = new FormData();
    fd.append("prescription", file);

    setLoading(true); setStatus("");
    try {
      const res = await api.post("/upload/prescription", fd, { headers: { "Content-Type": "multipart/form-data" }});
      setStatus("Uploaded successfully. Order reference: " + (res.data?.orderId || "—"));
    } catch (err) {
      setStatus(err?.response?.data?.message || err.message || "Upload failed");
    } finally { setLoading(false); }
  }

  return (
    <Box className="page-hero container">
      <Typography variant="h4" sx={{ mb:1 }}>Upload Prescription</Typography>
      <form onSubmit={submit}>
        <input type="file" accept="image/*,application/pdf" onChange={(e)=>setFile(e.target.files[0])} />
        <Box sx={{ mt:2 }}>
          <Button variant="contained" type="submit" disabled={loading}>{loading ? "Uploading…" : "Upload"}</Button>
        </Box>
        {status && <Box sx={{ mt:2 }}>{status}</Box>}
      </form>
    </Box>
  );
}