"use strict";

const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    // if (err) throw err;
    if (err) {
      return res.send({ isAuth: false, message: "Error in auth" }, err);
    }
    if (!user)
      return res.json({
        isAuth: false,
        message: "No user found",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
