import Joi from "joi";

export const productCreateSchema = Joi.object({
  productName: Joi.string().min(3).max(10).required(),
  category: Joi.string().required(),
  subCategory: Joi.string(),
});

export const productUpdateSchema = Joi.object({
  productName: Joi.string(),
  category: Joi.string(),
  subCategory: Joi.string(),
}).min(1);
