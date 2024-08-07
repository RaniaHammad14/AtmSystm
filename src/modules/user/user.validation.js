import joi from "joi";
import generalField from "../../../utils/generalFields.js";

export const signUp = {
  body: joi
    .object({
      name: joi.string().required().min(3).max(30),
      email: joi
        .string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .required(),
      age: joi.number().required(),
    })
    .required(),
  file: generalField.file.required(),
  headers: generalField.headers.required(),
};
export const signIn = {
  body: joi
    .object({
      email: joi
        .string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .required(),
    })
    .required(),
  file: generalField.file.required(),
  headers: generalField.headers.required(),
};
