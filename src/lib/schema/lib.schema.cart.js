import Joi from 'joi';

const addToCart = Joi.object().keys({
  quantity: Joi.number().required().min(1),
  size: Joi.string(),
});

const addToCartQuery = Joi.object().keys({
  id: Joi.string().required(),
});

const deleteFromCart = Joi.object().keys({
  id: Joi.string().required(),
});

const editProductInCart = Joi.object().keys({
  quantity: Joi.number().min(1),
  size: Joi.string(),
});

const editProductInCartQuery = Joi.object().keys({
  id: Joi.string().required(),
});

const getItemInCartQuery = Joi.object().keys({
  id: Joi.string().required(),
});

export default {
  addToCart,
  addToCartQuery,
  deleteFromCart,
  editProductInCart,
  editProductInCartQuery,
  getItemInCartQuery,
};
