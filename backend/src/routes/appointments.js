const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// create appointment (patient)
router.post('/', auth, async (req,res) => {
  try {
    const { doctorId, datetime, notes } = req.body;
    const appt = new Appointment({ patient: req.user._id, doctor: doctorId, datetime, notes });
    await appt.save();
    res.json(appt);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get appointments for user
router.get('/', auth, async (req,res) => {
  try {
    const { role } = req.user;
    let appts;
    if (role === 'patient') appts = await Appointment.find({ patient: req.user._id }).populate('doctor','name specialization');
    else if (role === 'doctor') appts = await Appointment.find({ doctor: req.user._id }).populate('patient','name email');
    else appts = await Appointment.find().populate('patient doctor','name');
    res.json(appts);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
