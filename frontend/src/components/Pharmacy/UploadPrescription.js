import React, { useState } from 'react';
import api from '../../api/api';

export default function UploadPrescription() {
  const [file, setFile] = useState(null);
  const submit = async e => {
    e.preventDefault();
    const form = new FormData();
    if(file) form.append('prescription', file);
    const res = await api.post('/pharmacy/upload', form, { headers: { 'Content-Type': 'multipart/form-data' }});
    alert('Uploaded: ' + res.data._id);
  };
  return (
    <form onSubmit={submit}>
      <input type="file" onChange={e=>setFile(e.target.files[0])} accept="image/*,application/pdf" />
      <button>Upload Prescription</button>
    </form>
  );
}
