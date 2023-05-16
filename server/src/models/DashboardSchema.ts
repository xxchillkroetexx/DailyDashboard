import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const DashboardSchema = new mongoose.Schema({
  name: String,
  weatherLocation: String,
  links: [
    {
      linkname: String,
      link: String,
    },
  ],
});

const DashboardModel = mongoose.model("Dashboard", DashboardSchema);
export default DashboardModel;
