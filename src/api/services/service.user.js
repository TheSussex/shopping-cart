import UserModel from '../models/model.user';

export const addNewUser = async(model, data) => model.create(data);

export const findUser = async(payload) => UserModel.findOne(payload);

export const verifyUser = async(data) => {
  const { email, isVerified } = data;
  const filter = { email };
  const update = { $set: { isVerified, emailVerificationToken: '', emailVerificationTokenExpiry: '' } };
  return UserModel.findOneAndUpdate(filter, update, { new: true });
};
