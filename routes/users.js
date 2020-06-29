var express = require('express');
const { User } = require('../models');
var router = express.Router();

// Lista todos los usuarios 
router.get('/', async function(req, res, next) {
  const users = await User.findAll();
  res.render("users/index", { users });
});

// Muestra el formulario de crear usuario
router.get('/new', function(req, res, next) {
  res.render("users/new");
});

// Crea un usuario en la DB y muestra vista de Ok
router.post('/', async function(req, res, next) {
  console.log(req.body);
  await User.create({
    firstName: req.body.firstName, 
    lastName : req.body.lastName,
    email: req.body.email,
  });
  res.redirect("/users");
});

module.exports = router;

