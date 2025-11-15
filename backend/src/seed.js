// backend/src/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);

  const patient = new User({
    name: 'Test Patient',
    email: 'patient@example.com',
    passwordHash: await bcrypt.hash('password123', salt),
    role: 'patient'
  });

  const doctor = new User({
    name: 'Dr. Alice',
    email: 'doctor@example.com',
    passwordHash: await bcrypt.hash('password123', salt),
    role: 'doctor',
    specialization: 'Cardiology'
  });

  const pharmacist = new User({
    name: 'Pharmacist Bob',
    email: 'pharm@example.com',
    passwordHash: await bcrypt.hash('password123', salt),
    role: 'pharmacist'
  });

  await Promise.all([patient.save(), doctor.save(), pharmacist.save()]);
  console.log('Seed complete');
  process.exit(0);
};

seed().catch(err=>{
  console.error(err);
  process.exit(1);
});