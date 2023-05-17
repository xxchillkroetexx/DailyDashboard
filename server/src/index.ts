import express, { Request, Response, json } from "express";
import mongoose, { mongo } from "mongoose";
import DashboardModel from "./models/DashboardSchema";
import { environment_dev } from "./enviroment/dev";
import { environment_prod } from "./enviroment/prod";

// * Spezifizierung des Ports, auf den die App hören soll
const PORT = 5000;

// * App erstellen
const app = express();
// Support für JSON requests
app.use(express.json());

// Sinnloser Kommentar

// * Pfade und deren response
// GET
app.get("/", (req: Request, res: Response) => {
  res.send("index page");
});

// POST
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
