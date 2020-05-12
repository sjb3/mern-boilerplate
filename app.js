"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { User } = require("./models/User");
const config = require("./config/key");
// require("dotenv").config();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Weclome to mongoDB Atlas: connected to database"))
  .catch((err) => console.error(err));

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(bodyParser.urlencoded({ extended: true })); // not to deprecate
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(400).json({ success: false, err }));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
