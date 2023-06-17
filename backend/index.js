const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// dot env
require("dotenv").config();

// setting express app
const app = express();

// adding middlewares
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// testing route to ensure server is working
app.get("/", (req, res) => {
  res.json({ success: true, message: "working fine" });
});

// configuring routes of different role users
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// connecting to database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err.message));


app.listen(port, () => console.log(`App is Running on port ${port}`));
