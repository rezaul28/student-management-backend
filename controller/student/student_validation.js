const Joi = require("joi").extend(require("@joi/date"));
const Joi2 = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const Field = require("../../model/Field");

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
const custom_fields = {
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
};

const create_validation = async (data) => {
  console.log(data);
  data = delete_empty_field(data);
  const create_schema = Joi.object({...custom_fields});
  console.log(create_schema);
  const val = create_schema.validate(data);
  if (!!val.error) {
    return val.error.details[0].message;
  } else {
    return false; // something falsy
  }
};
module.exports.create_validation = async (req, res, next) => {
  req = await assign_custom_fields(req);
  const validation_error = await create_validation(req.body);
  if (!!validation_error) {
    res.status(400).send(FAILURE(validation_error));
    return validation_error;
  } else {
    next();
  }
};

const custom_fields_edit = {
  id: Joi.objectId().required(),
  name: Joi.string().min(STRING_MIN).max(STRING_MAX),
  email: Joi.string().email(),
  status: Joi.string().valid("Unconfirmed", "Admitted", "Terminated"),
  phone: Joi.string()
    .regex(/^01\d{9}$/)
    .message("Phone number is invalid"),
  class: Joi.string(),
};

const edit_validation = async (data) => {
  data = delete_empty_field(data);

  const create_schema = Joi.object({...custom_fields_edit});
  console.log(create_schema);
  const val = create_schema.validate(data);
  if (!!val.error) {
    return val.error.details[0].message;
  } else {
    return false; // something falsy
  }
};
module.exports.edit_validation = async (req, res, next) => {
  req = await assign_custom_fields_edit(req);
  const validation_error = await edit_validation(req.body);
  if (!!validation_error) {
    res.status(400).send(FAILURE(validation_error));
    return validation_error;
  } else {
    next();
  }
};

async function assign_custom_fields_edit(req) {
  let fields = await Field.findOne();
  req["custom_fields"] = {};
  for (let element of fields.fields) {
    console.log(element.title);
    console.log(req.body[element.title]);
    req.custom_fields[element.title] = req.body[element.title];
    switch (element.format) {
      case "date":
        custom_fields_edit[element.title] = Joi.date();
        break;
      case "number":
        custom_fields_edit[element.title] = Joi.number();
        break;
      case "string":
        custom_fields_edit[element.title] = Joi.string();
        break;
      case "boolean":
        custom_fields_edit[element.title] = Joi.boolean();
        break;
    }
  }
  return req;
}

async function assign_custom_fields(req) {
  let fields = await Field.findOne();
  req["custom_fields"] = {};
  for (let element of fields.fields) {
    console.log(element.title);
    console.log(req.body[element.title]);
    req.custom_fields[element.title] = req.body[element.title];
    switch (element.format) {
      case "date":
        custom_fields[element.title] = Joi.date();
        break;
      case "number":
        custom_fields[element.title] = Joi.number();
        break;
      case "string":
        custom_fields[element.title] = Joi.string();
        break;
      case "boolean":
        custom_fields[element.title] = Joi.boolean();
        break;
    }
  }
  return req;
}
