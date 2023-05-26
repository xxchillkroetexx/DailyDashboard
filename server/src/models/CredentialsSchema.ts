import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const CredentialsSchema = new mongoose.Schema({
  username: String,
  passwordhash: String,
});

const CredentialsModel = mongoose.model("Credentials", CredentialsSchema);
export default CredentialsModel;
