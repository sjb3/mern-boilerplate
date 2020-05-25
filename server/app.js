"use strict";

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const helmet = require("helmet");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Weclome to mongoDB Atlas: connected to database"))
  .catch((err) => console.error(err));

app.use(morgan("common"));
app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//   })
// );
app.use(cors());
// Not to get any deprecation warning or error
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// To get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() =>
      res.status(200).json({ success: true, message: "Registration success" })
    )
    .catch((err) => res.status(400).json({ success: false, err }));
});

app.post("/api/users/login", (req, res) => {
  // Find the Email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Authentication failed, no user found",
      });
    }

    // Compare Password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Authentication failed: wrong password",
        });
      }

      // Generate Token
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send({
            message: "Error occorred in generating token",
          });
        }
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          message: "Success in generating token",
        });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) {
      return res.json({
        success: false,
        message: "Log out failed.",
      });
    }
    return res.status(204).send({
      success: true,
      message: "Log out success",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
