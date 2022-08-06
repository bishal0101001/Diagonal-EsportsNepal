const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const util = require("util");
const onlineUser = require("../models/onlineUserModel");

// const path = require("path");

const asyncHandler = require("express-async-handler");
const { User, validate } = require("../models/userModel");
// const { FriendReqPool } = require("../models/friendReqPoolModel");

const generateToken = require("../utils/generateToken");

const secret_key = process.env.ENCRYPTIONKEY;
const secret_iv = process.env.IV;
const encryptionAlgo = "AES-256-CBC";
const key = crypto
  .createHash("sha512")
  .update(secret_key, "utf-8")
  .digest("hex")
  .substring(0, 32);
const iv = crypto
  .createHash("sha512")
  .update(secret_iv, "utf-8")
  .digest("hex")
  .substring(0, 16);

// const emailTemplate = require('../templates/email');

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.message);
    }

    const { username, email, password } = req.body;
    if (!email) {
      res.status(422);
      throw new Error({ message: "Missing email." });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already registered");
    }

    const user = await User.create({ username, email, password, pool: {} });
    // sendVerificationEmail(user.email);

    if (user) {
      res.status(201);
      sendData(user, res, generateToken);
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      message: "Fuck you mf.",
    });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    sendData(user, res, generateToken);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { id: token } = req.params;

  if (!token) {
    res.status(422);
    throw new Error("Missing Token");
  }

  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }

  try {
    const user = await User.findOne({ email: payload.id }).exec();
    if (!user) {
      res.status(404);
      throw new Error("User does not exists");
    }

    user.verified = true;
    updatedUser = await user.save();

    // var options = {
    //   root: path.join(__dirname, "../templates"),
    // };

    // res.status(200).sendFile("email.js", options);
    res.status(200).send({ isVerified: updatedUser.verified });
    // sendData(user, res, generateToken);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(422).send({ message: "Email is required mfs" });

  res.status(200).send({ message: "Verification email sent." });

  sendVerificationEmail(email);
});

const sendVerificationEmail = (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const url = "http://localhost:5000/api/user/verify/${generateToken(email)}";

  transporter.sendMail({
    to: email,
    subject: "Verify Account",
    html: `Click <a href = '${url}'>here</a> to confirm your email.`,
  });
};

const listUser = asyncHandler(async (req, res) => {
  const { keyword: params } = req.query;
  const keyword = params ? { username: { $regex: params, $options: "i" } } : {};
  const user = await User.find({ ...keyword }).select("_id username");
  res.status(200).send({ user });
});

const sendRequest = asyncHandler(async (req, res) => {
  const { source: sourceId, destination: destinationId } = req.query;
  const session = await mongoose.startSession();
  const sourceUser = await User.findById(sourceId).select("username pool");
  const destinationUser = await User.findById(destinationId).select(
    "username pool"
  );
  // console.log(
  //   util.inspect(req.io, false, null, true /* enable colors */),
  //   "req"
  // );

  try {
    session.startTransaction();
    destinationUser.pool.friendRequests?.forEach((item) => {
      if (item.details._id.toString() === sourceId.toString())
        throw new Error("Already sent!!!");
    });

    sourceUser.pool.sentRequests?.forEach((item) => {
      if (item.details._id.toString() === destinationId.toString())
        throw new Error("Already sent!!!");
    });

    const emitData = {
      _id: sourceId,
      username: sourceUser.username,
    };

    const from = await User.updateOne(
      { _id: sourceId },
      {
        $addToSet: {
          "pool.sentRequests": {
            details: {
              _id: destinationId,
              username: destinationUser.username,
            },
          },
        },
      }
    ).session(session);

    const to = await User.updateOne(
      {
        _id: destinationId,
      },
      {
        $addToSet: {
          "pool.friendRequests": {
            details: {
              _id: sourceId,
              username: sourceUser.username,
            },
          },
        },
      }
    ).session(session);

    if (from.acknowledged && to.acknowledged) {
      (async (emit) => {
        const user = await getUser(destinationId);
        // const connectionId = user.map((item) => {
        //   if (item.userId == destinationId) return item.connectionId;
        // });
        console.log(user[0]?.connectionId, "connectionId");
        // emit(req, connectionId, emitData, "friendRequest");
        emit(req, user[0]?.connectionId, emitData, "friendRequest");
      })(emitNotification);
    } else {
      throw new Error("Something went wrong!!!");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).send(destinationId);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error(error);
  }
});

const cancelRequest = asyncHandler(async (req, res) => {
  const { source: sourceId, destination: destinationId } = req.query;
  const session = await mongoose.startSession();
  const sourceUser = await User.findById(sourceId).select("username pool");
  const destinationUser = await User.findById(destinationId).select(
    "username pool"
  );

  const emitData = {
    _id: sourceId,
    username: sourceUser.username,
  };

  try {
    session.startTransaction();
    if (
      destinationUser.pool.friendRequests.filter(
        (item) => item.details._id.toString() === sourceId.toString()
      ).length < 1
    ) {
      throw new Error("Invalid Attempt from destinationUser");
    }
    if (
      sourceUser.pool.sentRequests.filter(
        (item) => item.details._id.toString() === destinationId.toString()
      ).length < 1
    ) {
      throw new Error("Invalid Attempt from sourceUser");
    }

    const from = await User.updateOne(
      { _id: sourceId },
      {
        $pull: {
          "pool.sentRequests": {
            details: {
              _id: destinationId,
              username: destinationUser.username,
            },
          },
        },
      }
    ).session(session);
    console.log(from, "form");

    const to = await User.updateOne(
      {
        _id: destinationId,
      },
      {
        $pull: {
          "pool.friendRequests": {
            details: {
              _id: sourceId,
              username: sourceUser.username,
            },
          },
        },
      }
    ).session(session);

    if (from.acknowledged && to.acknowledged) {
      (async (emit) => {
        // const userId = sourceId;
        const user = await getUser(destinationId);
        // const connectionId = user.map((item) => {
        //   if (item.userId == destinationId) return item.connectionId;
        // });
        // console.log(connectionId, "connectionId");
        // emit(req, connectionId, emitData, "cancelFriendRequest");
        console.log(user[0]?.connectionId, "connectionId");
        emit(req, user[0]?.connectionId, emitData, "cancelFriendRequest");
      })(emitNotification);
    } else {
      throw new Error("Something went wrong");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).send(destinationId);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error(error);
  }
});

const acceptRequest = asyncHandler(async (req, res) => {
  const { source: sourceId, destination: destinationId } = req.query;
  const session = await mongoose.startSession();
  const sourceUser = await User.findById(sourceId).select(
    "username pool friends"
  );
  const destinationUser = await User.findById(destinationId).select(
    "username pool friends"
  );

  const emitData = {
    _id: sourceId,
    username: sourceUser.username,
  };

  console.log(
    sourceUser.pool.sentRequests.map((i) => {
      i;
    })
  );

  console.log(sourceUser, "sourceUser");

  console.log(
    sourceUser.friends.findIndex((i) => i.details._id === destinationId),
    "index"
  );

  // console.log(
  //   sourceUser.pool?.sentRequests.findIndex(
  //     (i) => i.details._id === destinationId
  //   ),
  //   "index of sentReq",
  //   );

  if (
    sourceUser.friends.findIndex((i) => i.details._id === destinationId) > 0
  ) {
    throw new Error("Already accepted!!!!");
  }

  if (
    destinationUser.friends.findIndex((i) => i.details._id === sourceId) > 0
  ) {
    throw new Error("Already accepted!!!!");
  }

  if (
    sourceUser.pool?.sentRequests.findIndex(
      (i) => i.details._id === destinationId
    ) < 0
  ) {
    throw new Error("Request not sent");
  }

  if (
    destinationUser.pool?.friendRequests.findIndex(
      (i) => i.details._id === sourceId
    ) < 0
  ) {
    throw new Error("No request found");
  }

  try {
    session.startTransaction();
    const updateFriendsFrom = await User.updateOne(
      { _id: sourceId },
      {
        $addToSet: {
          "friends": {
            details: {
              _id: destinationId,
              username: destinationUser.username,
            },
          },
        },
      }
    ).session(session);

    const updateFriendsTo = await User.updateOne(
      { _id: destinationId },
      {
        $addToSet: {
          "friends": {
            details: {
              _id: sourceId,
              username: sourceUser.username,
            },
          },
        },
      }
    ).session(session);

    const sentRequestsPool = await User.updateOne(
      { _id: sourceId },
      {
        $pull: {
          "pool.sentRequests": {
            details: {
              _id: destinationId,
              username: destinationUser.username,
            },
          },
        },
      }
    ).session(session);

    const friendRequestsPool = await User.updateOne(
      { _id: destinationId },
      {
        $pull: {
          "pool.friendRequests": {
            details: {
              _id: sourceId,
              username: sourceUser.username,
            },
          },
        },
      }
    ).session(session);

    if (
      !updateFriendsFrom.acknowledged ||
      !updateFriendsTo.acknowledged ||
      !sentRequestsPool.acknowledged ||
      !friendRequestsPool.acknowledged
    ) {
      throw new Error("Something went wrong");
    } else {
      (async (emit) => {
        const user = await getUser(sourceId);
        // console.log(user, "getUser sourceId");
        // const connectionId = user.map((i) => {
        //   i.userId == destinationId;
        //   return i.connectionId;
        // });
        // console.log(connectionId, "conn");
        console.log(user[0].connectionId, "connectionId");
        emit(req, user[0]?.connectionId, emitData, "acceptFriendRequest");
      })(emitNotification);
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json(emitData);
  } catch (ex) {
    session.endSession();
    res.status(400);
    throw new Error(ex);
  }
});

function emitNotification(req, connectionId, emitData, event) {
  req.io.of("/api/socket").to(connectionId).emit(event, emitData);
}

async function getUser(userId) {
  const activeUsers = await onlineUser.find({});
  const active = activeUsers[0].users.filter((item) => item.userId == userId);
  return active;
}

const decryptUserDetails = asyncHandler(async (req, res) => {
  const { encrypted } = req.body;
  if (!encrypted) throw new Error("No data");
  const decrypted = decrypt(encrypted, encryptionAlgo, key, iv);
  console.log(typeof decrypted._id, "decrypted");

  const tokenExpired = isTokenExpired(decrypted?.token);
  if (tokenExpired) {
    res.status(401).send("token expired");
  } else {
    const id = decrypted._id;
    const user = await User.findById(id, "pool friends").exec();
    if (!user) {
      throw new Error("User not found");
    }
    decrypted.pool = user.pool;
    decrypted.friends = user.friends;
    res.status(200).send(decrypted);
  }
});

function isTokenExpired(token) {
  return (
    Date.now() >=
    JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp * 1000
  );
}

function encrypt(data, encryptionMethod, secret, iv) {
  const cipher = crypto.createCipheriv(encryptionMethod, secret, iv);
  const aes_encrypted =
    cipher.update(JSON.stringify(data), "utf-8", "base64") +
    cipher.final("base64");
  return Buffer.from(aes_encrypted).toString("base64");
}

function decrypt(data, encryptionMethod, secret, iv) {
  const buff = Buffer.from(data, "base64");
  data = buff.toString("utf8");
  const decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return JSON.parse(
    decryptor.update(data, "base64", "utf-8") + decryptor.final("utf8")
  );
}

function sendData(user, res, generateToken) {
  const { _id, username, email, isAdmin, verified, pool, friends } = user;

  const data = {
    _id,
    username,
    email,
    isVerified: verified,
    token: generateToken(_id),
    pool,
    friends,
  };

  if (isAdmin) {
    data.isAdmin = isAdmin;
  }
  const encyptedData = encrypt(data, encryptionAlgo, key, iv);

  res.send(encyptedData);
}

module.exports = {
  registerUser,
  authUser,
  verifyUser,
  verifyEmail,
  listUser,
  sendRequest,
  cancelRequest,
  acceptRequest,
  decryptUserDetails,
};
