const express = require('express');
const router = express.Router();
// const { register } = require('../controllers/registerController');
const { checkToken } = require("../middlewares/auth")

router.get('/', checkToken, (req, res) => {
    res.render('home.html');
  });

module.exports = router;