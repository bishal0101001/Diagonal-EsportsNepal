const express = require("express");

const userRoutes = require("./userRoutes");
const tournamentRoutes = require("./tournamentRoutes");

module.exports = function (app) {
  app.use(express.json());
  app.use(require("../middleware/formatUserLoginData"));
  app.use("/api/user", userRoutes);
  app.use("/api/tournament", tournamentRoutes);
};
