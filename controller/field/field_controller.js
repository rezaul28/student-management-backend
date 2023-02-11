const {STATUS} = require("../../api_response");
const Field = require("../../model/Field");
const Student = require("../../model/Student");

module.exports.create_initial_object = async (req) => {
  try {
    if (!(await Field.findOne())) {
      await new Field().save();
      console.log("Field object created successfully");
      return true;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports.create = async (req) => {
  try {
    console.log(req.body.field);
    for (let element of req.body.field) {
      console.log(element);
      let abc = await this.delete({body: {field: {title: element.title}}});
      console.log(JSON.stringify(abc));
    }
    let abc = {$set: {[`custom_fields.${req.body.field[0].title}`]: "NULL"}};
    console.log(abc);
    await Student.updateMany({}, abc);
    return await Field.findOneAndUpdate(
      {},
      {$push: {fields: {$each: req.body.field}}},
      {new: true}
    );
  } catch (error) {
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};

module.exports.get = async (req) => {
  try {
    return await Field.findOne();
  } catch (error) {
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};

module.exports.delete = async (req) => {
  try {
    let abc = {
      $unset: {[`custom_fields.${Object.values(req.body.field)[0]}`]: ""},
    };
    console.log(abc);
    await Student.updateMany({}, abc);
    return await Field.findOneAndUpdate(
      {},
      {$pull: {fields: req.body.field}},
      {new: true}
    );
  } catch (error) {
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};
