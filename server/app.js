var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const passportConfig = require('./config/passport');

var db = require('./db/db.js');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.all('/api', function(req, res, next) {
  next();
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
 // res.status(err.status || 500);
 // res.render('error');
  res.sendStatus(500);
});

// serving static files like profile pics
app.use('/files', express.static('/srv/uploads'))
module.exports = app;

// User serlialization using passport
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

// User deserialization using passport
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.use(passport.initialize());
   passportConfig(passport);

   // Login user and generate JWT
   app.post('/login', (req, res, next) => {
     passport.authenticate('local', { session: false }, (err, user, info) => {
       if (err || !user) {
         return res.status(400).json({
           success: false,
           message: info ? info.message : 'Login failed',
           user: user
         });
       }
       const payload = { id: user.id, username: user.username };
       const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
       return res.json({ success: true, token: token });
     })(req, res, next);
   });

   // Protected route
   app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
     res.json({ message: 'You are authenticated!', user: req.user });
   });