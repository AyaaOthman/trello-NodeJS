import Joi from "joi";
const signUpSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email().required(),
  age: Joi.number().min(10).max(30).required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  isVerified: Joi.boolean(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export { signUpSchema, signInSchema };
