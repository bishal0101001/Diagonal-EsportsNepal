const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    throw new Error("Not Authorized");
  }
});

const admin = (req, res, next) => {
  const { user } = req;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };
