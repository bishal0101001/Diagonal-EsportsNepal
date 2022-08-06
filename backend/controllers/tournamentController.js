const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");

const { Tournament, validateTournament } = require("../models/tournamentModel");
const { User } = require("../models/userModel");

const createTournamentSchema = asyncHandler(async (req, res) => {
  const { validateFullSchema } = validateTournament();
  validateData(validateFullSchema, req.body, res);

  const { name, tournament, type } = req.body;

  try {
    const tournamentSchema = await Tournament.create({
      name,
      tournament,
      type,
    });
    res.status(201).json(tournamentSchema);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const createTournament = asyncHandler(async (req, res) => {
  const { validateTournamentSchema } = validateTournament();
  const id = req.params.id;
  validateData(validateTournamentSchema, [req.body], res);

  try {
    const { name, poolPrize, startsIn, status, participants } = req.body;

    const tournament = await Tournament.updateOne(
      { _id: id },
      {
        $push: {
          "tournament": { name, poolPrize, startsIn, status, participants },
        },
      }
    );
    res.status(200).send(tournament);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const registerForSquadTournament = asyncHandler(async (req, res) => {
  const { schemaId, tournamentId } = req.query;
  const teamData = req.body;

  // CHECK FOR REPEATED USER // 1
  // const data = teamData.map((item) => item._id);
  // const duplicateUser = data.some((item, index) => {
  //   return data.indexOf(item) !== index;
  // });
  // if (duplicateUser) throw new Error("Duplicate user found mf");

  try {
    const userIds = teamData.map((i) => i._id);
    const users = await User.find({ _id: { $in: userIds } }, { password: 0 });
    // console.log(users, "users");
    // const tournamentSchema = await Tournament.findOne(
    //   { "_id.$[i].tournament.$[j]._id": tournamentId },
    //   { arrayFilters: [{ "i._id": schemaId }, { "j._id": tournamentId }] }
    // );
    const tournamentSchema = await Tournament.findOne(
      { _id: schemaId, "tournament._id": tournamentId },
      { "tournament.$": 1 }
    );
    // const tourna = await tournamentSchema.findOne({
    //   "tournament._id": tournamentId,
    // });
    console.log(tournamentSchema, "tournaaa");

    // CHECK FOR USER IS REGISTERED OR NOT // 2
    // let verifiedUsers;
    // let unverifiedUser = [];
    // if (users.length === 0) {
    //   throw new Error("No user found");
    // } else if (users.length > 0) {
    //   verifiedUsers = users?.map((user) => user._id.toString());
    //   userIds.some((item) => {
    //     if (!verifiedUsers.includes(item)) {
    //       unverifiedUser.push(item);
    //     }
    //   });
    // }
    // if (unverifiedUser.length > 0)
    //   throw { message: "User not found", data: unverifiedUser };

    // CHECK FOR USER ALREADY REGISTERED FOR PARTICULAR TOURNAMENT IN TOURNAMENT DATA // 3
    // let players = [];
    // const test = tournamentSchema?.tournament?.map((item) => {
    //   if (item._id.toString() == tournamentId) {
    //     console.log(item.participants, "idddd");
    //     return item?.participants?.map((i) =>
    //       i.players.map((j) => {
    //         players.push({ _id: j._id });
    //         return j._id;
    //       })
    //     );
    //   } else {
    //     throw new Error("Invalid data");
    //   }
    // });

    // const existingUser = teamData.map((i) =>
    //   players.find((j) => j._id === i._id)
    // );

    // for (let i = 0; i < existingUser.length; i++) {
    //   if (existingUser[i]) {
    //     const error = {
    //       message: "User already registered for this tournament",
    //       data: existingUser,
    //     };
    //     throw error;
    //   }
    // }

    // CHECK FOR USER ALREADY REGISTERED FOR PARTICULAR TOURNAMENT IN USER DATA // 4
    // const registeredForTournament = users.map(
    //   (user) => user.registeredForTournament
    // );

    // const tournamentRegistration = registeredForTournament
    //   .map((i) => i[0]?.tournament)
    //   .includes(tournamentId);

    // if (tournamentRegistration)
    //   throw new Error("User already registered for tournament");

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await tournamentSchema
        .updateOne(
          {
            $push: {
              "tournament.$[i].participants": {
                tournamentId,
                teamName: "Narpichas",
                players: teamData.map((data) => ({
                  _id: data._id,
                  name: data.name,
                })),
              },
            },
          },
          { arrayFilters: [{ "i._id": tournamentId }] }
        )
        .session(session);

      await User.updateMany(
        { _id: { $in: userIds } },
        {
          $push: {
            registeredForTournament: {
              tournament: tournamentId,
              time: new Date().getTime(),
            },
          },
        },
        { new: true }
      ).session(session);
    });

    session.endSession();

    res.status(200).send({ data: tournamentSchema.tournament });
  } catch (error) {
    console.log(error, "error from tournamentController");
    res.status(400);
    throw new Error(error);
  }
});

const testRoutes = asyncHandler(async function (req, res) {
  const { schemaId, tournamentId } = req.query;

  const data = await Tournament.findOne({ _id: schemaId });
  const tournament = await data.updateOne(
    {
      $push: { "tournament.$[i].participants": { fake: "data" } },
    },
    { upsert: true },
    { arrayFilters: [{ "i._id": tournamentId }] }
  );
  res.send(tournament);
});

function validateData(func, data, res) {
  const { error } = func(data);
  if (error) {
    res.status(400);
    throw new Error(error);
  }
}

module.exports = {
  createTournamentSchema,
  createTournament,
  registerForSquadTournament,
  testRoutes,
};
