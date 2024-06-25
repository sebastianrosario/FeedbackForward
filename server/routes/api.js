var express = require('express');
var router = express.Router();
const passport = require('passport');
var upload = require('../db/config/upload.js')
const UserController = require('../db/controllers/user-controller');
const PostController = require('../db/controllers/post-controller');
const FileController = require('../db/controllers/file-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Its alive' });
});

  
// User section
router.post('/users', passport.authenticate('jwt', { session: false }), UserController.createUser);
router.get('/users/:uid', passport.authenticate('jwt', { session: false }), UserController.getUserByUsername);
router.post('/users/login', UserController.compPassword);

// Post section
router.post('/posts/new', passport.authenticate('jwt', { session: false }), PostController.createPost);
router.get('/posts/:pid', passport.authenticate('jwt', { session: false }), PostController.getPostById);
router.get('/posts/fromuser/:uid', passport.authenticate('jwt', { session: false }), PostController.getPostByUsername);
router.post('/posts/:pid/comment', passport.authenticate('jwt', { session: false }), PostController.commentOnPost);
router.delete('/posts/:pid/comment/:cid', passport.authenticate('jwt', { session: false }), PostController.deleteCommentOnPost);

// Upload Section =
router.post('/file/upload', upload.single('file'), FileController.handleUpload);


module.exports = router;
