import express from "express";
import * as car from "./routes/cars";
import * as user from "./routes/users"
import AppDataSource from "../db/config/db";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(express.json());
app.use("/api/cars", car.router);
app.use("/api/users", user.router);

export default app;
