const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const admin = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailid: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("admin", admin);

module.exports = userpr;
