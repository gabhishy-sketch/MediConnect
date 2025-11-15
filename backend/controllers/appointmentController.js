const Appointment = require("../models/Appointment");

exports.book = async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.json(appointment);
};