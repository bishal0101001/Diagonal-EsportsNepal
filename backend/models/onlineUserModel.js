const mongoose = require("mongoose");

const onlineUserSchema = new mongoose.Schema({
  users: [
    {
      connectionId: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

const onlineUser = mongoose.model("onlineUser", onlineUserSchema);

module.exports = onlineUser;
