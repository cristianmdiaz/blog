var express = require('express');
var router = express.Router();

var users = [
  { email: "pepito@gmail.com", name: "Pepito" },
  { email: "jona@gmail.com", name: "Jona" },
  { email: "Joshep@gmail.com", name: "Joshep" },
]

// Lista todos los usuarios 
router.get('/', function(req, res, next) {
  res.render("users/index", {users} );
});

// Muestra el formulario de crear usuario
router.get('/new', function(req, res, next) {
  res.render("users/new");
});

// Crea un usuario en la DB y muestra vista de Ok
router.post('/', function(req, res, next) {
  console.log(req)
  res.redirect("/users");
});

module.exports = router;

