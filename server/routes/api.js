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
router.post('/users', UserController.createUser);
router.get('/users/:uid', UserController.getUserByUsername);
router.put('/users/:uid', passport.authenticate('jwt', { session: false }), UserController.updateUser);
router.post('/users/login', UserController.compPassword);
router.put('/users/:uid', passport.authenticate('jwt', { session: false }), UserController.updateUser); // Update user endpoint
router.delete('/users/:uid', passport.authenticate('jwt', { session: false }), UserController.deleteUser);

// Post section
router.post('/posts/new', passport.authenticate('jwt', { session: false }), PostController.createPost);
router.put('/posts/:pid/upvote', passport.authenticate('jwt', { session: false }), PostController.upvotePost);
router.put('/posts/:pid', passport.authenticate('jwt', { session: false }), PostController.updatePost); // Update post endpoint
router.get('/posts/:pid', PostController.getPostById);
router.get('/posts/filter/fromuser/:uid', PostController.getPostByUsername);
router.get('/posts/filter/byupvotes', PostController.getPostByUpvotes);
router.get('/posts/filter/twohoursago', PostController.getPostByTime);
router.get('/posts/filter/tags', PostController.getPostByTags)
router.get('/posts/filter/search', PostController.getPostByKeyword)
router.delete('/posts/:pid', passport.authenticate('jwt', { session: false }), PostController.deletePost);

// Comments
router.post('/posts/:pid/comment', passport.authenticate('jwt', { session: false }), PostController.commentOnPost);
router.delete('/posts/:pid/comment/:cid', passport.authenticate('jwt', { session: false }), PostController.deleteCommentOnPost);

// Upload Section =
router.post('/file/upload', upload.single('file'), passport.authenticate('jwt', {session: false}), FileController.handleUpload);

module.exports = router;
