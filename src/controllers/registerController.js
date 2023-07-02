const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, process.env.JWT);

    res.cookie('jwt', token, { httpOnly: true, secure: false });
    return res.json({ success: true });
    
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
};
