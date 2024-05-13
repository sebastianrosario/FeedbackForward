var express = require('express');
var router = express.Router();

const UserController = require('../db/controllers/user-controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', UserController.createUser);
router.get('/users/:uid', UserController.getUserById);

module.exports = router;
