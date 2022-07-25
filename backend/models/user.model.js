import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserModelSchema = new Schema({
  id: Number,
  nonce: Number,
  publicAddress: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  lastLogin: Date,
  username: { type: String, min: 3, max: 24 }
});

export const UserModel = mongoose.model('UserModel', UserModelSchema);
