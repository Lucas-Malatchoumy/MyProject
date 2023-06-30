const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { login } = require('../controllers/loginController');

router.post('/', login);
router.get('/toto', async (req, res) => {
    try {
        // Utilisez la méthode findAll de Sequelize pour récupérer tous les utilisateurs
        const users = await User.findAll();
    
        // Renvoie les utilisateurs récupérés en tant que réponse
        res.json(users);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      }
    });

module.exports = router;