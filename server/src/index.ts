import { environment_dev } from "./enviroment/dev";
import { environment_prod } from "./enviroment/prod";
import express, { Request, Response, json, response } from "express";
import mongoose, { mongo } from "mongoose";
import DashboardModel from "./models/DashboardSchema";
import CredentialsModel from "./models/CredentialsSchema";
import UserModel from "./models/UserSchema";
import axios, { AxiosResponse } from "axios";
import authJwt from "./middlewares/authJwt";
import verifySignUp from "./middlewares/verifySignUp";
import authRoutes from "./routes/auth.routes";

// * Spezifizierung des Ports, auf den die App hören soll
const PORT = 50000;

// * App erstellen
const app = express();
// Support für JSON requests
app.use(express.json());

// * Pfade und deren response
// Default index
app.get("/", (req: Request, res: Response) => {
  res.send("index page");
});

// * Joke API
app.get("/joke", async (req: Request, res: Response) => {
  // help funktion for fetching data form external sites
  async function fetchData(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      return response.data;
    } catch (error) {
      console.error("Error calling an API:", error);
      throw error;
    }
  }
  // fetch random Joke
  try {
    const fetchedJoke = await fetchData();
    // output for debugging
    console.log(fetchedJoke);

    res.json(fetchedJoke);
  } catch (error) {}
});
//End Joke API

// * Register
app.post("/register", async (req: Request, res: Response) => {
  console.log(req.body);

  // const existingUser = await mongoose.connection
  //   .collection("users")
  //   .findOne({ username: req.body["username"] });

  // check if users already in use
  if (
    await mongoose.connection
      .collection("users")
      .findOne({ username: req.body["username"] })
  ) {
    res.json({ body: "username already in use" });
  } else {
    const User = new UserModel({
      username: req.body["username"],
      email: req.body["email"],
      passwordhash: req.body["passwordhash"],
    });
    const newUser = await User.save();
    res.json(newUser);
  }
});

// TODO Change Model and login
// * Login
// GET credentials identified by a hash (SHA256)
app.get("/login", async (req: Request, res: Response) => {
  // output for debugging
  console.log(req.body);

  const foundCredential = await mongoose.connection
    .collection("credentials")
    .findOne({ passwordhash: req.body["passwordhash"] });
  res.json(foundCredential);
});

// POST for creating new users with password hashes
app.post("/login", async (req: Request, res: Response) => {
  // output for debugging
  console.log(req.body);

  const Credentials = new CredentialsModel({
    username: req.body["username"],
    passwordhash: req.body["passwordhash"],
  });

  const createdCredentials = await Credentials.save();
  res.json(createdCredentials);
});
// End Login

// * Dashboard
// Get a Dashboard from the Database
app.get("/dashboard", async (req: Request, res: Response) => {
  // output for debugging
  console.log(req.body);

  const fetchedDashboard = mongoose.connection
    .collection("dashboards")
    .findOne({ name: "default" });

  res.json(fetchedDashboard);
});

// Create Dashboards in the Database
app.post("/dashboard", async (req: Request, res: Response) => {
  // print the request body to the console
  console.log(req.body);

  // pass the given Json to the DashboardModel
  const Dashboard = new DashboardModel({
    name: req.body["name"],
    weatherLocation: req.body["weatherLocation"],
    links: req.body["links"],
  });

  // Save the Dashboard to the DB
  const createdDashboard = await Dashboard.save();
  // Give the created Dashboard back as response
  res.json(createdDashboard);
});
// * Ende Pfade

// * Verbindung zu MongoDB
mongoose
  .connect(
    // Connect to MongoDB
    environment_dev.mongodb
  )
  .then(() => {
    // * Starte Anwendung nachdem Verbindung zur DB steht
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });

// JsonWebToken export

// export default {
//   authJwt,
//   verifySignUp,
// };
