const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

const {FAILURE} = require("../../api_response");

const create_schema = Joi.object({
  field: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      format: Joi.string().required().valid("Date", "Number", "String", "Boolean"),
    })
  ),
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
