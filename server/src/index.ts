import { environment_dev } from "./enviroment/dev";
import { environment_prod } from "./enviroment/prod";
import express, { Request, Response, json, response } from "express";
import mongoose, { mongo } from "mongoose";
import DashboardModel from "./models/DashboardSchema";
import UserModel from "./models/UserSchema";
import axios, { AxiosResponse } from "axios";
import cors from "cors";
import Parser from "rss-parser";

// * Spezifizierung des Ports, auf den die App hören soll
const PORT = 50000;

// * App erstellen
const app = express();
// Support für JSON requests
app.use(express.json());
// Support for Cross-Origin Requests
app.use(cors());

// * Pfade und deren response
// Default index
app.get("/", (req: Request, res: Response) => {
  res.send("index page");
});

// ! Joke API
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

// ! RSS Feed API
app.get("/RSS", async (req: Request, res: Response) => {
  
  // Grab an rss feed using rss-parser
  const parser = new Parser();
  const feed = await parser.parseURL("https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml");

  // output for debugging
  console.log(feed.items.slice(0, 3));

  //  return the first 3 articles as json  
  res.json(feed.items.slice(0, 3));

});


// ! End RSS Feed API

// ! Register
app.post("/register", async (req: Request, res: Response) => {
  // output for debugging
  console.log(req.body);

  // check if user already in use
  if (
    await mongoose.connection
      .collection("users")
      .findOne({ username: req.body["username"] })
  ) {
    res.json({ message: "username already in use!" });
  }
  // check if email already in use
  else if (
    await mongoose.connection
      .collection("users")
      .findOne({ email: req.body["email"] })
  ) {
    res.json({ message: "email already in use!" });
  }
  // create new user and save it to the database
  else {
    const User = new UserModel({
      username: req.body["username"],
      email: req.body["email"],
      passwordhash: req.body["passwordhash"],
    });
    const newUser = await User.save();
    console.log(newUser);

    res.json({ message: "User created!" });
  }
});

// TODO check cookie
// ! Login
// POST login with existing credentials
app.post("/login", async (req: Request, res: Response) => {
  // output for debugging
  console.log(req.body);
  // Call to DB and find user with username
  const foundUser = await mongoose.connection
    .collection("users")
    .findOne({ username: req.body["username"] });
  // Check if user exists and if username and passwordhash are the same as the provided ones
  if (
    foundUser != null &&
    foundUser["username"] == req.body["username"] &&
    foundUser["passwordhash"] == req.body["passwordhash"]
  ) {
    // return Success
    res.json({
      message: "Login Successful",
      loggedIn: "True",
      username: req.body["username"],
      token: req.body["username"] + req.body["passwordhash"] + "123456789",
    });
  } else {
    // return Failure
    res.json({
      message: "Login Failure",
      loggedIn: "False",
      username: req.body["username"],
    });
  }
});
// End Login

// ! Dashboard
// Get a Dashboard from the Database
app.get("/dashboard", async (req: Request, res: Response) => {
  // output for debugging
  console.log("get /dashboard", req.body);

  const fetchedDashboard = mongoose.connection
    .collection("dashboards")
    .findOne({ name: "default" });

  // res.json(fetchedDashboard);
});

// Create Dashboards in the Database
app.post("/userdashboard", async (req: Request, res: Response) => {
  // print the request body to the console
  console.log("post /userdashboard", req.body);

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

// ! Verbindung zu MongoDB
mongoose
  .connect(
    // Connect to MongoDB
    environment_dev.mongodb
  )
  .then(() => {
    // ! Starte Anwendung nachdem Verbindung zur DB steht
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
// * Ende Verbindung zu MongoDB
