import * as passport from 'passport';
import * as local from 'passport-local';
import * as mongoose from 'mongoose';
import User from '../models/user';

let LocalStrategy = local.Strategy;


passport.serializeUser(function(user, done){
  done(null, user)
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  function(email, password, done){
  User.findOne({email: email}, function(err, user){
  if(err){
    return done(err);
  } else if (!user){
    return done(null, false, {message: 'incorect email'});
  }else if (!user.validatePassword(password)){
    return done(null, false, {message: 'incorect password'});
  }
  return done(null, user)
});
}));
