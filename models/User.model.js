const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Name is required']
    },
    image: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
