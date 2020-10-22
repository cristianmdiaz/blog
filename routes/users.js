var express = require('express');
const { User } = require('../models');
var router = express.Router();

// Lista todos los usuarios 
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll();
    console.log(req.query)
    res.render("users/index", { users, params: req.query  });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Muestra el formulario de crear usuario
router.get('/new', function(req, res, next) {
  res.render("users/new", { user: User.build(), params: req.params });
});

// Muestra el formulario de editar el usuario
router.get('/:id([0-9]+)/edit', async function(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    res.render("users/edit", { user });
  } catch (error) {
    return res.send(error.message);
  } 
});

// Muestra el formulario de eliminar el usuario
router.get('/:id([0-9]+)/delete', async function(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    res.render("users/delete", { user });
  } catch (error) {
    return res.send(error.message);
  } 
});

// Actualiza datos de un usuario
router.post('/:id([0-9]+)/edit', async function(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.userName = req.body.userName,
    await user.save();
    res.redirect("/users?error=0&message=" + encodeURI("User was created"));
  } catch (error) {
    console.log(error)
    return res.redirect("/users/" + params.id + "/edit?error=1");
  } 
});

// Crea un usuario en la DB y muestra vista de Ok
router.post('/', async function(req, res, next) {
  console.log(req.body);
  await User.create({
    firstName: req.body.firstName, 
    lastName : req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
  });
  res.redirect("/users");
});

// Elimina un usuario en la DB y muestra vista de Ok
router.post('/:id([0-9]+)/delete', async function(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
    }
    res.redirect("/users?error=0&message=" + encodeURI("User was deleted"));
  } catch (error) {
    console.log(error)
    return res.redirect("/users/" + params.id + "/delete?error=1");
  } 
});

router.delete('/', function(req, res, next) {
  return res.send('ok')
});

module.exports = router;

