// import React, { Fragment, useContext, useState } from "react";
// import {
//   Form,
//   FormCheckboxInput,
//   FormEmailInput,
//   FormTextInput,
//   FormSubmitButton,
//   FormPasswordInput,
//   FormRadioboxInput,
// } from "./jsx/components/form";

// import Joi from "joi";
// import BorderBeautyWrap from "./jsx/components/borderBeautyWrap";
// export const schema = Joi.object({
//   fm_login: Joi.string().alphanum().required().messages({
//     "string.alphanum": `should contain alphabets and mumbers only`,
//     "string.empty": `cannot be an empty field`,
//     "string.min": `should have a minimum length of {#limit}`,
//     "string.max": `should have a minimum length of {#max}`,
//     "any.required": `required field`,
//   }),

//   email_login: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .messages({
//       "string.empty": `cannot be an empty field`,
//       "string.email": `should be a valid email with .com or .net`,
//     }),

//   password_login: Joi.string()
//     .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
//     .required()
//     .messages({
//       "string.empty": `cannot be an empty field`,
//       "string.min": `should have a minimum length of {#limit}`,
//       "string.max": `should have a minimum length of {#max}`,
//       "string.pattern.base": `must contain alphabets and mumbers only and 8 characters long atleast`,
//     }),

//   check_login: Joi.boolean().required(),
// });

// const TestCponent = () => {
//   const o = { name: 0, best: 1 };
//   const handleFormSubmit = (event, inputs) => {
//     event.preventDefault();
//     console.log(inputs);
//     // console.error(errors);
//   };
//   const onError = (errors) => {
//     console.log(errors);
//   };
//   return (
//     <Form onSubmit={handleFormSubmit} schema={schema} onError={onError}>
//       <FormTextInput id="fm_login" text="First name" />
//       <FormEmailInput id="email_login" text="email" />
//       <FormPasswordInput id="password_login" text="password" />
//       <FormCheckboxInput id="check_login" text="remember this" />

//       <FormSubmitButton id="submit-button">Login</FormSubmitButton>
//     </Form>
//   );
// };

// export default BorderBeautyWrap(TestCponent);
