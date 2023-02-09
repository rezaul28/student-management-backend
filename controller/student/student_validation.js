const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

const config = require("config");

const STRING_MIN = config.get("STRING_MIN");
const STRING_MAX = config.get("STRING_MAX");

const {FAILURE} = require("../../api_response");

const delete_empty_field = (obj) => {
  Object.keys(obj).forEach(
    (key) => (obj[key] === undefined || obj[key] === "") && delete obj[key]
  );
  return obj;
};

const create_schema = Joi.object({
  name: Joi.string().min(STRING_MIN).max(STRING_MAX).required(),
  email: Joi.string().email().required(),
  status: Joi.string()
    .valid("Unconfirmed", "Admitted", "Terminated")
    .required(),
  phone: Joi.string()
    .regex(/^01\d{9}$/)
    .message("Phone number is invalid")
    .required(),
  class: Joi.string().required(),
});

const create_validation = (data) => {
  data = delete_empty_field(data);
  const val = create_schema.validate(data);
  if (!!val.error) {
    return val.error.details[0].message;
  } else {
    return false; // something falsy
  }
};
module.exports.create_validation = (req, res, next) => {
  const validation_error = create_validation(req.body);
  if (!!validation_error) {
    res.status(400).send(FAILURE(validation_error));
    return validation_error;
  } else {
    next();
  }
};
