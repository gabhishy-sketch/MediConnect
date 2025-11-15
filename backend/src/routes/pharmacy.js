const express = require('express');
const router = express.Router();
const { auth, permit } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Prescription = require('../models/Prescription');

// patient uploads prescription
router.post('/upload', auth, upload.single('prescription'), async (req,res) => {
  try {
    const { medicines = [] } = req.body;
    const prescription = new Prescription({
      patient: req.user._id,
      doctor: req.body.doctorId || null,
      medicines: Array.isArray(medicines) ? medicines : [],
      uploadedFilePath: req.file ? req.file.path : undefined
    });
    await prescription.save();
    res.json(prescription);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// pharmacist verifies
router.post('/:id/verify', auth, permit('pharmacist','admin'), async (req,res) => {
  try {
    const p = await Prescription.findById(req.params.id);
    if(!p) return res.status(404).json({ msg: 'Not found' });
    p.verifiedByPharmacist = true;
    await p.save();
    res.json(p);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// list prescriptions (pharmacist)
router.get('/', auth, permit('pharmacist','admin'), async (req,res) => {
  try {
    const list = await Prescription.find().populate('patient doctor','name email');
    res.json(list);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
