require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const express = require("express");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const interviewRoute = require("./routes/interviewRoute");
const aiRoute = require("./routes/aiRoute");
const attemptRoute = require("./routes/attemptRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/interview", interviewRoute);
app.use("/ai", aiRoute);
app.use("/attempts", attemptRoute);

const PORT = process.env.PORT;
app.listen(PORT, (error) =>
  error ? console.log(error) : console.log(`Server is Running at Port ${PORT}`),
);
