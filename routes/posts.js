var express = require('express');
const { Post } = require('../models');
var router = express.Router();

// Lista todos los posts
router.get('/', async function(req, res, next) {
  const posts = await Post.findAll();
  res.render("posts/index", { posts });
});

// Muestra cada Post con su contenido
router.get('/:id([0-9]+)', async function(req, res, next) {
  try {
    const post = await Post.findByPk(req.params.id);
    res.render("posts/show", { post });
  } catch (error) {
    return res.send(error.message);
  } 
});

//Muestra el formulario para crear un nuevo post
router.get('/new', function(req, res, next){
 res.render('posts/new',{ params: req.query });
})

// Crea un post en la DB y muestra vista de Ok
router.post('/', async function(req, res, next) {
  try {
    await Post.create({
      userid: "6",
      title: req.body.title,  
      description : req.body.description,
      body: req.body.body,
    });
  } catch (error) {
    console.log(error)
    return res.redirect("/posts/new?error=1");
  }
  res.redirect("/posts");
});


module.exports = router;
