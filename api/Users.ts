import * as express from 'express';
import User from '../models/user';
import passport = require('passport');
import * as jwt from 'jsonwebtoken';


let router = express.Router();
// Login method
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', function(err, user, info) {
    console.log(user.email)
    console.log('authenticating...')
    if(err) {
      console.log('login failed...')
      console.log(err.message)
      return next(err);
    } else if(user){
      console.log('login successfull...')
      return res.json({token: user.generateToken(), user: user});
    }
    console.log('Unauthorized...');
    return res.status(400).send(info);
  })(req, res, next);
});


// Registration Method
router.post('/register', (req, res) => {
  if (req.body.password == req.body.confirmPassword) {
    console.log('this happened');
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.generateHash(req.body.password);
    console.log(user.firstName + ' ' + user.password + ' ' + user.email)
    user.save()
      .then((newUser) => {
        console.log('The registration was successfull...');
        res.json('User successfully registered');
      })
      .catch((err) => {
        console.log('Registration failed...');
        res.json(err)
      });
  } else (
    res.send('The password do not match')
  )
});

// get secret message method
router.get('/message', verifyToken ,(req, res)=>{
  try{
    res.json({message: 'Secret Message shhhhh...'});
  } catch(err) {
    res.json(err);
  }
})
// Method to veryfy token
function  verifyToken(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, 'SecretString', function(err, decoded){
      if(err){
        return res.json({success: false, message: 'Token authentication failed...'});
      } else {
        req.decoded = decoded;
        next()
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided ...'
    });
  }
}
export default router;
