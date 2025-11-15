import React from "react";
import API from "../api/api";

export default function UploadPrescription() {
  const upload = async () => {
    await API.post("/pharmacy/upload");
    alert("Uploaded Successfully!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Prescription</h2>

      <button onClick={upload}>Upload</button>
    </div>
  );
}