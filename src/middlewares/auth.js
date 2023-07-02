const { verify } = require('jsonwebtoken');
require('dotenv').config()

const checkToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decodedToken = verify(token, process.env.JWT);
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
    return res.redirect('login');
  }
};

module.exports = { checkToken };
