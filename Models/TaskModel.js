const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const task = new Schema(
  {
    createdby: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    clients: {
      type: Object,
      required: true,
      ref: "client",
    },
    users: {
      type: Object,
      required: true,
      ref: "user",
    },
    comments: {
      type: Array,
      required: true,
    },
    transferredby: {
      type: Object,
    },
    recurringtask: {
      type: String,
      required: true,
    },
    taskfile: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// So before saving it into the database.. it will encrypt the password using bcrypt
// We are making a salt... that will be used to encrypt the password

const userpr = mongoose.model("task", task);

module.exports = userpr;
