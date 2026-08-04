require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB()
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, (error) =>
  error ? console.log(error) : console.log(`Server is Running at Port ${PORT}`),
);
