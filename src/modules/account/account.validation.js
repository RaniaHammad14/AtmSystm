import joi from "joi";
import generalField from "../../../utils/generalFields.js";

export const addAccount = {
  body: joi
    .object({
      balance: joi.number().min(0).integer().required(),
    })
    .required(),
  file: generalField.file.required(),
  headers: generalField.headers.required(),
};
