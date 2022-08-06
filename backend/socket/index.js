const mongoose = require("mongoose");
const onlineUser = require("../models/onlineUserModel");
const util = require("util");
const { User } = require("../models/userModel");

module.exports = function (io) {
  io.of("/api/socket").on("connection", async (socket) => {
    console.log("User connected: ", socket.id);
    const userId = socket.handshake.query.aUxd;
    const existingUser = await getUser(userId);

    userId &&
      ((addUser, removeUser) => {
        if (existingUser.length > 0) {
          removeUser("userId", userId);
        }
        addUser(socket.id.toString(), userId);
      })(addUser, removeUser);

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
      removeUser("connectionId", socket.id.toString());
    });
  });

  const getUser = async (userId) => {
    const activeUsers = await onlineUser.find({});
    const active = activeUsers[0].users.filter((item) => item.userId == userId);
    return active;
  };

  const addUser = async (connectionId, userId) => {
    await onlineUser.updateOne(
      { _id: "627a467a4baa9bbb459c6261" },
      {
        $push: { users: { connectionId, userId } },
      }
    );
  };

  const removeUser = async (key, id) => {
    const deletingElement = {
      [key]: id,
    };
    await onlineUser.updateOne(
      {
        _id: "627a467a4baa9bbb459c6261",
      },
      {
        $pull: { "users": deletingElement },
      }
    );
  };

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Setting change streams");
    const tournamentDataChangeStream = connection
      .collection("tournaments")
      .watch({ fullDocument: "updateLookup" });

    tournamentDataChangeStream.on("change", (change) => {
      switch (change.operationType) {
        case "update":
          const data = {
            schema: change.documentKey,
            data: change.updateDescription.updatedFields,
          };

          io.of("/api/socket").emit("updatedData", data);
          break;
      }
    });

    //   const userChangeStream = connection
    //     .collection("users")
    //     .watch({ fullDocument: "updateLookup" });
    //   userChangeStream.on("change", async (change) => {
    //     // console.log(
    //     //   util.inspect(change, false, null, true /* enable colors */),
    //     //   "change"
    //     // );

    //     switch (change.operationType) {
    //       case "update":
    //         let keys = Object.keys(change.updateDescription?.updatedFields);
    //         if (keys[0].includes("sentRequests")) {
    //           const { _id, username } = change.fullDocument;
    //           const emitData = {
    //             _id,
    //             username,
    //           };
    //           const request = change.updateDescription.updatedFields[keys[0]];
    //           // console.log(request, "req");
    //           if (request.details) {
    //             const userId = request?.details?._id;

    //             const user = await getUser(userId);
    //             // console.log(userId, "user");

    //             function emitNotification(connectionId) {
    //               io.of("/api/socket")
    //                 .to(connectionId[0])
    //                 .emit("friendRequest", emitData);
    //             }
    //             ((emit) => {
    //               const connectionId = user.map((item) => {
    //                 if (item.userId == userId) return item.connectionId;
    //               });
    //               console.log(connectionId, "connectionId");
    //               emit(connectionId);
    //             })(emitNotification);
    //           }
    //         }
    //         if (keys[0].includes("friendRequests")) {
    //           // console.log(change, "changeeee");
    //           // console.log(
    //           //   change.updateDescription.updatedFields[keys[0]],
    //           //   "change"
    //           // );
    //           const { _id, username } = change.fullDocument;
    //           const emitData = {
    //             _id,
    //             username,
    //           };

    //           const user = await getUser(_id.toString());
    //           // console.log(user, "user");

    //           function emitNotification(connectionId) {
    //             io.of("/api/socket")
    //               .to(connectionId)
    //               .emit("cancelFriendRequest", emitData);
    //           }
    //           const updatedData = change.updateDescription.updatedFields[keys[0]];
    //           if (Array.isArray(updatedData)) {
    //             // console.log(
    //             //   updatedData?.map((item) => item.details._id === user[0].userId),
    //             //   "updateField"
    //             // );
    //             if (change.updateDescription.updatedFields[keys[0]]) {
    //               ((emit) => {
    //                 const connectionId = user[0]?.connectionId;
    //                 console.log(connectionId, "connectionId");
    //                 emit(connectionId);
    //               })(emitNotification);
    //             }
    //           }
    //         }
    //       //Break;;
    //       // case "delete":
    //       //   if (keys[0].includes("sentRequests")) {
    //       //     const { _id, username } = change.fullDocument;
    //       //     const emitData = {
    //       //       _id,
    //       //       username,
    //       //     };
    //       //     const request = change.updateDescription.updatedFields;
    //       //     const userId = request[keys[0]]?.details?._id;

    //       //     const user = await getUser(userId);

    //       //     function emitCancelNotification(connectionId) {
    //       //       io.of("/api/socket")
    //       //         .to(connectionId[0])
    //       //         .emit("cancelFriendRequest", emitData);
    //       //     }
    //       //     ((emit) => {
    //       //       const connectionId = user.map((item) => {
    //       //         if (item.userId == userId) return item.connectionId;
    //       //       });
    //       //       console.log(connectionId, "connectionId");
    //       //       emit(connectionId);
    //       //     })(emitCancelNotification);
    //       //   }
    //     }
    //   });
  });
};
