const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT);
    res.cookie('jwt', token, { httpOnly: true, secure: false });
    return res.json({ success: true });

  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
};

