const User = require('../models/user');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log(user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  login,
};
