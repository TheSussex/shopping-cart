import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    roleCode: {
      type: String,
      default: 'USER',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: '',
    },
    emailVerificationTokenExpiry: {
      type: String,
      default: '',
    },
    salt: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

const UserModel = model('user', userSchema);

export default UserModel;
