const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get doctors, with optional specialization filter
router.get('/', async (req,res) => {
  try {
    const { specialization } = req.query;
    const filter = { role: 'doctor' };
    if (specialization) filter.specialization = specialization;
    const doctors = await User.find(filter).select('-passwordHash');
    res.json(doctors);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
