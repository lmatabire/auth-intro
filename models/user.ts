import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt-nodejs';

interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.method('generateHash', function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});

userSchema.method('validatePassword', function(password){
  return bcrypt.compareSync(password, this.password);
});

userSchema.method('generateToken', function(){
  console.log('hello, from generateToken')
  return jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    'SecretString' // secret pw hwen evaluating the token
  )
})

export default mongoose.model<User>('User', userSchema)
