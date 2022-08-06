const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
// const { NewModel, validateTournament } = require("../models/newModel");
const { Tournament } = require("../models/tournamentModel");

const getTournamentData = async (req, res) => {
  const tournaments = await Tournament.aggregate([
    {
      $unwind: "$tournament",
    },
    {
      $match: {
        "tournament.status": { $in: ["scheduled", "active"] },
      },
    },
    {
      $group: {
        "_id": "$_id",
        "tournament": { $push: "$tournament" },
        "type": { $first: "$type" },
      },
    },
  ]);
  if (tournaments.length <= 0)
    return res.status(307).send("No tournaments available yet");

  return res.status(200).send(tournaments);
};

// const newModelTest = expressAsyncHandler(async (req, res) => {
//   const data = {
// name: "Grand Event",
// type: "Squad",
// tournament: [{
//   name: "Squad Triumph",
//   poolPrize: "10000",
//   startsIn: "2hr",
//   status: "scheduled",
//   participants: [
//     {
//       teamName: "Squad Narpichas",
//       players: [
//         { user: "620d163a947c7a925dbe5c58" },
//         { user: "620d163a947c7a925dbe5c59" },
//         { user: "620d163a947c7a925dbe5c60" },
//         { user: "620d163a947c7a925dbe5c61" },
//         // { user: "620d163a947c7a925dbe5c61" },
//         // { user: "620d163a947c7a925dbe5c61" },
//       ],
//     },
//   ],
// }],
//   };
//   const {
//     validateFullSchema,
//     validateTournamentSchema,
//     validateParticipantsSchema,
//   } = validateTournament();

//   // const { error } = validateFullSchema(data);
//   // if (error) return res.status(400).send({ error: error });

//   // const { error: participantsError } = validateParticipantsSchema();
//   // if (participantsError)
//   //   return res.status(400).send({ error: participantsError });

//   validateData(
//     validateTournamentSchema,
//     {
//       name: "Squad Triumph",
//       poolPrize: "10000",
//       startsIn: "2hr",
//       status: "scheduled",
//       participants: [
//         {
//           teamName: "Squad Narpichas",
//           players: [
//             { user: "620d163a947c7a925dbe5c58" },
//             { user: "620d163a947c7a925dbe5c59" },
//             { user: "620d163a947c7a925dbe5c60" },
//             { user: "620d163a947c7a925dbe5c61" },
//             { user: "620d163a947c7a925dbe5c61" },
//             // { user: "620d163a947c7a925dbe5c61" },
//           ],
//         },
//       ],
//     },
//     res
//   );

//   // const tournament = await NewModel.create(data);
//   // validateData(validateFullSchema, data, res);

//   res.status(201).send("done");
// });

// function validateData(func, data, res) {
//   const { error } = func(data);
//   if (error) {
//     res.status(400);
//     throw new Error(error);
//   }
// }

module.exports = { getTournamentData };
