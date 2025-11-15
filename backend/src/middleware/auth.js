const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    req.user = await User.findById(decoded.userId).select('-passwordHash');
    if (!req.user) return res.status(401).json({ msg: 'User not found' });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

const permit = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
  if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' });
  next();
};

module.exports = { auth, permit };
