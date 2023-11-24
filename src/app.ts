import express from "express";
import * as car from "./routes/cars";
import * as user from "./routes/users";
import * as login from "./routes/login";
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
app.use("/api/car", car.router);
app.use("/api/user", user.router);
app.use("/api/login", login.router);

export default app;
