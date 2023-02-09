const Student = require("../../model/Student");
const {STATUS} = require("../../api_response");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.create = async (req) => {
  let data = req.body;
  try {
    return await new Student(data).save();
  } catch (error) {
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};

module.exports.get = async (req) => {
  let {id, filter,sort} = req.query;
  try {
    let search_obj = {
      ...(filter && {
        $or: [
          {
            name: new RegExp(filter, "i"),
          },
          {
            email: new RegExp(filter, "i"),
          },
          {
            phone: new RegExp(filter),
          },
        ],
      }),
      ...(id && {
        _id: ObjectId(id),
      }),
    };
    let sort_filter = {
      ...(sort == "name_ascending" && {
        name: 1,
      }),
      ...(sort == "name_descending" && {
        name: -1,
      }),
    };
    if (Object.keys(sort_filter).length == 0)
      sort_filter = {
        name: 1,
      };
    return await Student.find(search_obj).sort(sort_filter);
  } catch (error) {
    console.log(error)
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};

module.exports.edit = async (req) => {
  let data = req.body;
  try {
    let admin = await Admin.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $set: data,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).lean();
    delete admin.password;
    return admin;
  } catch (error) {
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};

module.exports.delete = async (req) => {
  let {_id} = req.query;
  try {
    await Student.deleteOne({
      _id,
    });
    return true;
  } catch (error) {
    return {
      failed: true,
      status: STATUS.BAD_REQUEST,
      msg: error.message,
    };
  }
};
