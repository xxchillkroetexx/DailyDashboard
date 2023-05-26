import { environment_dev } from "./enviroment/dev";
import { environment_prod } from "./enviroment/prod";
import express, { Request, Response, json } from "express";
import mongoose, { mongo } from "mongoose";
import DashboardModel from "./models/DashboardSchema";
import CredentialsModel from "./models/CredentialsSchema";

// * Spezifizierung des Ports, auf den die App hören soll
const PORT = 50000;

// * App erstellen
const app = express();
// Support für JSON requests
app.use(express.json());

// Sinnloser Kommentar 1235

// * Pfade und deren response
// Default index
app.get("/", (req: Request, res: Response) => {
  res.send("index page");
});

// * Login
// GET credentials identified by a hash (SHA256)
app.get("/login", async (req: Request, res: Response) => {
  console.log(req.body);

  const foundCredential = await mongoose.connection
    .collection("credentials")
    .findOne({ passwordhash: req.body["passwordhash"] });
  res.json(foundCredential);
});

// POST for creating new users with password hashes
app.post("/login", async (req: Request, res: Response) => {
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
