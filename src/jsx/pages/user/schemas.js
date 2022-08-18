// import Joi from "joi";
const Joi = {};
export const registerSchema = Joi.object({
  name_register: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": `should contain alphabets and mumbers only`,
    "string.empty": `cannot be an empty field`,
    "string.min": `should have a minimum length of {#limit}`,
    "string.max": `should have a minimum length of {#max}`,
    "any.required": `required field`,
  }),

  email_register: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": `cannot be an empty field`,
      "string.email": `should be a valid email with .com or .net`,
    }),

  password_register: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.empty": `cannot be an empty field`,
      "string.min": `should have a minimum length of {#limit}`,
      "string.max": `should have a minimum length of {#max}`,
      "string.pattern.base": `must contain alphabets and mumbers only and 8 characters long atleast`,
    }),

  repassword_register: Joi.ref("password_register"),
}).with("repassword", "password");

export const loginSchema = Joi.object({
  email_login: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": `cannot be an empty field`,
      "string.email": `should be a valid email with .com or .net`,
    }),

  password_login: Joi.string().required().messages({
    "string.empty": `cannot be an empty field`,
  }),
});

export const checkoutDeliveryFormSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": `firse name is required`,
  }),
  second_name: Joi.string().required().messages({
    "string.empty": `second name is required`,
  }),
  address: Joi.string().required().messages({
    "string.empty": `Address is required`,
  }),
  phone: Joi.string()
    .pattern(
      new RegExp(
        "^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
      )
    )
    .required()
    .messages({
      "string.empty": `Phone number is required`,
      "string.pattern.base": `Phone number must be valid <br> ie: +212 123456789`,
    }),
});
