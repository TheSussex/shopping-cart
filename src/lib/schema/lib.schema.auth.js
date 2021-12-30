import Joi from 'joi';

const newUser = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required(),
    password: Joi.string().required(),
  });

const verifyToken = Joi.object().keys({
    id: Joi.string().required(),
  });
 
const login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

export default {
  newUser,
  verifyToken,
  login,
};