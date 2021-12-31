import Joi from 'joi';

const newCategory = Joi.object().keys({
  categoryName: Joi.string().required(),
  categoryCode: Joi.string().required(),
  description: Joi.string(),
});

const getCategory = Joi.object().keys({
  code: Joi.string().required(),
});

export default {
  newCategory,
  getCategory,
};
