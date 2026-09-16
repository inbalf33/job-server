const Joi = require("joi");

const editUserValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).required(),
      middle: Joi.string().max(256).allow(""),
      last: Joi.string().min(2).max(256).required(),
    }).required(),
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().allow("").optional(), // <--- הופך את הסיסמה לרשות!
    image: Joi.object({
      url: Joi.string().allow(""),
      alt: Joi.string().allow(""),
    }),
    address: Joi.object({
      state: Joi.string().allow(""),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.number().allow(""),
    }).required(),
    isRecruiter: Joi.boolean(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
};

module.exports = editUserValidation;