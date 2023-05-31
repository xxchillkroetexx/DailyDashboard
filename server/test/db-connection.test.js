import mongoose from "mongoose";
import { environment_dev } from "../src/enviroment/dev";

describe("MongoDB Connection Test", () => {
  beforeAll(async () => {
    // Increase the timeout to 10 seconds (10000 ms) as it takes time to spin up mongoDB
    jest.setTimeout(10000);

    // Connect to MongoDB
    await mongoose.connect(environment_dev.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the connection to MongoDB
    await mongoose.disconnect();
  });

  it("should connect to MongoDB", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
