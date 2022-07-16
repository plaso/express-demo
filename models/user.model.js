const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "oye que el nombre es requerido"],
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: EMAIL_PATTERN,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Eh! canijo que haces en mi web"],
      max: 120,
    },
    type: {
      type: String,
      required: true,
      enum: ["admin", "superAdmin", "regular"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
