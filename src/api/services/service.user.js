import UserModel from '../models/model.user';
import Hash from '../../lib/hash';

export const addNewUser = (data) => {
  const {
    username, email, phoneNumber, password, isConfirmed, isActive,
  } = data;
  return new UserModel({
    userId: Hash.generateUserId(),
    username,
    email,
    phoneNumber,
    password,
    isConfirmed,
    isActive,
  });
};

export const findUser = (payload) => UserModel.findOne({ payload });

export const verifyUser = async(data) => {
  const { userId, isVerified } = data;
  const filter = { userId };
  const update = { $set: { isVerified, emailVerificationToken: '', emailVerificationTokenExpiry: '' } };
  const user = await UserModel.findOneAndUpdate(filter, update);
  return user;
};