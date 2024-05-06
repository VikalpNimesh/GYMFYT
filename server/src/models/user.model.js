import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String, 
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phoneNumber: Number,
    DOB: String,
    profileImage: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);

