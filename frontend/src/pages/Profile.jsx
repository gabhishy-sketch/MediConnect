import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from "../api/api";

export default function Profile(){
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [msg, setMsg] = useState("");

  async function save(e){
    e.preventDefault();
    try {
      const res = await api.put("/users/me", { name, phone });
      login(res.data.token || localStorage.getItem("token"), res.data.user);
      setMsg("Saved");
    } catch (err) {
      setMsg(err?.response?.data?.message || err.message || "Save failed");
    }
  }

  return (
    <Box className="page-hero container">
      <Typography variant="h4">Profile</Typography>
      <form onSubmit={save} style={{ maxWidth:480 }}>
        <TextField fullWidth label="Full name" sx={{ mt:2 }} value={name} onChange={e=>setName(e.target.value)} />
        <TextField fullWidth label="Phone" sx={{ mt:2 }} value={phone} onChange={e=>setPhone(e.target.value)} />
        <Box sx={{ mt:2 }}>
          <Button variant="contained" type="submit">Save</Button>
        </Box>
        {msg && <Box sx={{ mt:2 }}>{msg}</Box>}
      </form>
    </Box>
  );
}