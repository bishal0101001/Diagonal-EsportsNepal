const mongoose = require("mongoose");

const friendReqSchema = new mongoose.Schema({
  sentRequestsPool: [
    {
      type: Object,
      sourceUser: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        username: { type: String, required: true },
      },
      destinationUser: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        username: { type: String, required: true },
      },
      timeStamp: { type: Date, default: Date.now },
      status: { type: Boolean, default: false, required: true },
      // default: {},
    },
  ],
  cancelRequestsPool: [
    {
      type: Object,
      sourceUser: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        username: { type: String, required: true },
      },
      destinationUser: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        username: { type: String, required: true },
      },
      timeStamp: { type: Date, default: Date.now },
      status: { type: Boolean, default: false },
      // default: {},
    },
  ],
});

const FriendReqPool = mongoose.model("FriendReqPool", friendReqSchema);

module.exports = { FriendReqPool };
