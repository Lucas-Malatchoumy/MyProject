const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { login } = require('../controllers/loginController');

router.get('/', (req, res) => {
  res.render('login.html');
});

router.post('/', login);
router.get('/toto', async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
    res.redirect('home.html')
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

module.exports = router;
