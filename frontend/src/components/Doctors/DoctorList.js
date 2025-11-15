import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  useEffect(()=> {
    api.get('/doctors').then(r=>setDoctors(r.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2>Doctors</h2>
      {doctors.map(d => (
        <div key={d._id}>
          <h3>{d.name} ({d.specialization})</h3>
          <button onClick={()=> {
            const datetime = prompt('Enter datetime (YYYY-MM-DD HH:mm)');
            api.post('/appointments', { doctorId: d._id, datetime: new Date(datetime) })
               .then(()=>alert('Appointment booked')).catch(e=>alert('Error'));
          }}>Book</button>
        </div>
      ))}
    </div>
  );
}
