var express = require('express');
var router = express.Router();

const UserController = require('../db/controllers/user-controller');
const PostController = require('../db/controllers/post-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Its alive' });
});


// User section
router.post('/users', UserController.createUser);
router.get('/users/:uid', UserController.getUserByUsername);
router.post('/users/login', UserController.compPassword);

// Post section
router.post('/posts/new', PostController.createPost);
router.get('/posts/:pid', PostController.getPostById);
router.get('/posts/fromuser/:uid', PostController.getPostByUsername);
router.post('/posts/:pid/comment', PostController.commentOnPost);
router.delete('/posts/:pid/comment/:cid', PostController.deleteCommentOnPost);


module.exports = router;
