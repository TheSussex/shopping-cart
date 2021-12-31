import Joi from 'joi';

const newProduct = Joi.object().keys({
  productName: Joi.string().required(),
  categoryCode: Joi.string().required(),
  description: Joi.string(),
  sellingPrice: Joi.number().required(),
  expirationDate: Joi.date().required(),
});

const editProduct = Joi.object().keys({
  productName: Joi.string(),
  description: Joi.string(),
  sellingPrice: Joi.number(),
  stockLevel: Joi.number(),
  expirationDate: Joi.date(),
});

const editProductQuery = Joi.object().keys({
  sku: Joi.string().required(),
});

const getProduct = Joi.object().keys({
  sku: Joi.string().required(),
});

const deleteProduct = Joi.object().keys({
  id: Joi.string().required(),
});

export default {
  newProduct,
  getProduct,
  deleteProduct,
  editProduct,
  editProductQuery,
};
