import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [slot, setSlot] = useState("");

  useEffect(() => {
    API.get("/doctors").then((res) => {
      const doc = res.data.find((d) => d._id === doctorId);
      setDoctor(doc);
    });
  }, [doctorId]);

  const book = async () => {
    await API.post("/appointments/book", {
      doctorId,
      patientId: "test", // replace with actual logged in user later
      slot,
    });

    alert("Appointment booked!");
  };

  if (!doctor) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Appointment with {doctor.name}</h2>

      <select onChange={(e) => setSlot(e.target.value)}>
        <option>Select Slot</option>
        {doctor.availableSlots.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <br /><br />
      <button onClick={book}>Book</button>
    </div>
  );
}