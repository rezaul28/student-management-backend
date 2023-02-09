const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const mySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: "This email is already in use",
    },
    class: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: "This phone number is already in use",
    },
    status: {
      type: String, //unconfirmed, admitted, terminated
      default: true,
    },
    custom_fields: {
      type: {},
    },
  },
  {timestamps: true}
);

mySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Student", mySchema);
