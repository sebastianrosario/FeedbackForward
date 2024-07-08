const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../db/models/user-model');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => done(err, false));
  }));

  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.passwordCheck(password)
          .then(isMatch => {
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password.' });
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
};