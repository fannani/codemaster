import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

var UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  salt: String,
  name: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

UserSchema.methods.verifyPassword = function(password) {
  return this.password === password;
  // const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  // return this.hash === hash;
};

export default mongoose.model('User', UserSchema);
