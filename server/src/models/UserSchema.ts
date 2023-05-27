import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordhash: String,
});

const UserModel = mongoose.model("Credentials", UserSchema);
export default UserModel;
