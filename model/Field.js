const mongoose = require("mongoose");

const mySchema = new mongoose.Schema(
  {
    fields: {
      type: [
        {
          title: {
            type: String,
          },
          format: {
            type: String,
          },
        },
      ],
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Field", mySchema);
