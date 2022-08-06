// ADD //
const changeAdd1 = {
  txnNumber: 1,
  lsid: {
    id: new Binary(Buffer.from("3ac9e2d6e71f4cbb8ff621993cbbe549", "hex"), 4),
    uid: new Binary(
      Buffer.from(
        "75daa8b7af2f2e90543e73aea858f671d0a5bff76ffef17d6554b092760712c1",
        "hex"
      ),
      0
    ),
  },
  _id: {
    _data:
      "8262B88633000000022B022C0100296E5A10042CA7EEF1E12046A494DFCC08CD1707CA46645F6964006462AD475365AE1C18F89110DD0004",
  },
  operationType: "update",
  clusterTime: new Timestamp({ t: 1656260147, i: 2 }),
  fullDocument: {
    _id: new ObjectId("62ad475365ae1c18f89110dd"),
    username: "bishal1",
    email: "bishal1@gmail.com",
    password: "$2a$15$z2aDz8gX1LxrZcTDukVWh.jKSuoCcaUMzyA0Rt3U7bqrG60JUsC8O",
    verified: false,
    registeredForTournament: [],
    isAdmin: false,
    pool: {
      friendRequests: [
        {
          details: { _id: "620d163a947c7a925dbe5c58", username: "__bishal" },
        },
        {
          details: { _id: "62aca82a1d4e98c8bbc735c7", username: "_bishal" },
        },
      ],
      sentRequests: [
        {
          details: { _id: "62119c78961d485004bcd17f", username: "bishalllll" },
        },
        {
          details: { _id: "62aca82a1d4e98c8bbc735c7", username: "_bishal" },
        },
      ],
    },
    friends: [],
    __v: 0,
  },
  ns: { db: "esportsNepal", coll: "users" },
  documentKey: { _id: new ObjectId("62ad475365ae1c18f89110dd") },
  updateDescription: {
    updatedFields: {
      "pool.sentRequests.1": {
        details: { _id: "62aca82a1d4e98c8bbc735c7", username: "_bishal" },
      },
    },
    removedFields: [],
    truncatedArrays: [],
  },
};
const changeAdd2 = {
  txnNumber: 1,
  lsid: {
    id: new Binary(Buffer.from("3ac9e2d6e71f4cbb8ff621993cbbe549", "hex"), 4),
    uid: new Binary(
      Buffer.from(
        "75daa8b7af2f2e90543e73aea858f671d0a5bff76ffef17d6554b092760712c1",
        "hex"
      ),
      0
    ),
  },
  _id: {
    _data:
      "8262B88633000000022B022C01002B026E5A10042CA7EEF1E12046A494DFCC08CD1707CA46645F6964006462ACA82A1D4E98C8BBC735C70004",
  },
  operationType: "update",
  clusterTime: new Timestamp({ t: 1656260147, i: 2 }),
  fullDocument: {
    _id: new ObjectId("62aca82a1d4e98c8bbc735c7"),
    username: "_bishal",
    email: "_bishal@gmail.com",
    password: "$2a$15$RB/6O9O46tgc2.XivXqK7u6sNLDG/AWz4klEV2S45hLIW5A7rjNTi",
    verified: false,
    registeredForTournament: [],
    isAdmin: false,
    pool: {
      sentRequests: [
        {
          details: { _id: "62ad475365ae1c18f89110dd", username: "bishal1" },
        },
      ],
      friendRequests: [
        {
          details: { _id: "620d163a947c7a925dbe5c58", username: "__bishal" },
        },
        {
          details: { _id: "62ad475365ae1c18f89110dd", username: "bishal1" },
        },
      ],
    },
    friends: [],
    __v: 0,
  },
  ns: { db: "esportsNepal", coll: "users" },
  documentKey: { _id: new ObjectId("62aca82a1d4e98c8bbc735c7") },
  updateDescription: {
    updatedFields: {
      "pool.friendRequests.1": {
        details: { _id: "62ad475365ae1c18f89110dd", username: "bishal1" },
      },
    },
    removedFields: [],
    truncatedArrays: [],
  },
};

// CANCEL //
const changeCancel1 = {
  txnNumber: 3,
  lsid: {
    id: new Binary(Buffer.from("3d2c4b0aaa0549938ea7b095ca209a7a", "hex"), 4),
    uid: new Binary(
      Buffer.from(
        "75daa8b7af2f2e90543e73aea858f671d0a5bff76ffef17d6554b092760712c1",
        "hex"
      ),
      0
    ),
  },
  _id: {
    _data:
      "8262B88694000000012B022C0100296E5A10042CA7EEF1E12046A494DFCC08CD1707CA46645F6964006462AD475365AE1C18F89110DD0004",
  },
  operationType: "update",
  clusterTime: new Timestamp({ t: 1656260244, i: 1 }),
  fullDocument: {
    _id: new ObjectId("62ad475365ae1c18f89110dd"),
    username: "bishal1",
    email: "bishal1@gmail.com",
    password: "$2a$15$z2aDz8gX1LxrZcTDukVWh.jKSuoCcaUMzyA0Rt3U7bqrG60JUsC8O",
    verified: false,
    registeredForTournament: [],
    isAdmin: false,
    pool: {
      friendRequests: [
        {
          details: { _id: "620d163a947c7a925dbe5c58", username: "__bishal" },
        },
        {
          details: { _id: "62aca82a1d4e98c8bbc735c7", username: "_bishal" },
        },
      ],
      sentRequests: [
        {
          details: { _id: "62119c78961d485004bcd17f", username: "bishalllll" },
        },
      ],
    },
    friends: [],
    __v: 0,
  },
  ns: { db: "esportsNepal", coll: "users" },
  documentKey: { _id: new ObjectId("62ad475365ae1c18f89110dd") },
  updateDescription: {
    updatedFields: {
      "pool.sentRequests": [
        {
          details: { _id: "62119c78961d485004bcd17f", username: "bishalllll" },
        },
      ],
    },
    removedFields: [],
    truncatedArrays: [],
  },
};

const changeCancel2 = {
  txnNumber: 3,
  lsid: {
    id: new Binary(Buffer.from("3d2c4b0aaa0549938ea7b095ca209a7a", "hex"), 4),
    uid: new Binary(
      Buffer.from(
        "75daa8b7af2f2e90543e73aea858f671d0a5bff76ffef17d6554b092760712c1",
        "hex"
      ),
      0
    ),
  },
  _id: {
    _data:
      "8262B88694000000012B022C01002B026E5A10042CA7EEF1E12046A494DFCC08CD1707CA46645F6964006462ACA82A1D4E98C8BBC735C70004",
  },
  operationType: "update",
  clusterTime: new Timestamp({ t: 1656260244, i: 1 }),
  fullDocument: {
    _id: new ObjectId("62aca82a1d4e98c8bbc735c7"),
    username: "_bishal",
    email: "_bishal@gmail.com",
    password: "$2a$15$RB/6O9O46tgc2.XivXqK7u6sNLDG/AWz4klEV2S45hLIW5A7rjNTi",
    verified: false,
    registeredForTournament: [],
    isAdmin: false,
    pool: {
      sentRequests: [
        {
          details: { _id: "62ad475365ae1c18f89110dd", username: "bishal1" },
        },
      ],
      friendRequests: [
        {
          details: { _id: "620d163a947c7a925dbe5c58", username: "__bishal" },
        },
      ],
    },
    friends: [],
    __v: 0,
  },
  ns: { db: "esportsNepal", coll: "users" },
  documentKey: { _id: new ObjectId("62aca82a1d4e98c8bbc735c7") },
  updateDescription: {
    updatedFields: {
      "pool.friendRequests": [
        {
          details: { _id: "620d163a947c7a925dbe5c58", username: "__bishal" },
        },
      ],
    },
    removedFields: [],
    truncatedArrays: [],
  },
};
