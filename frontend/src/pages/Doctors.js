import React, { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully!");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />

      <button onClick={submit}>Register</button>
    </div>
  );
}