const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tournament: [
      new mongoose.Schema({
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          required: true,
          auto: true,
        },
        name: { type: String, required: true },
        poolPrize: {
          type: String,
          required: true,
        },
        startsIn: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        participants: {
          type: [
            {
              type: Object,
              tournamentId: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                default: "",
              },
              teamName: {
                type: String,
                required: true,
              },
              players: {
                type: [
                  {
                    _id: {
                      type: mongoose.SchemaTypes.ObjectId,
                      ref: "User",
                      required: true,
                      default: "",
                    },
                    name: {
                      type: String,
                      reqired: true,
                    },
                  },
                ],
              },
              required: true,
              default: {},
            },
          ],
          required: true,
          default: [],
        },
        type: {
          type: String,
          required: true,
        },
      }),
    ],
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// function validatePlayers(players) {
//   console.log(players, "players");
// }

// newSchema.pre("save", function (next) {
//   try {
//     console.log("saving.....");
//     const { error } = validateTournament({
//       name: this.name,
//       tournament: this.tournament,
//       type: this.type,
//     });
//     if (!error) return next();
//     throw new Error(error);
//   } catch (error) {
//     next(error);
//   }
// });

tournamentSchema.pre("updateOne", async function (next) {
  console.log("updating...");
  const key = "tournament.$[i].participants";
  const data = this._update.$push;
  console.log(data[key], "dataaa");

  const { validateParticipantsSchema } = validateTournament();
  const { error } = validateParticipantsSchema(
    data[key] ? [data[key]] : data.tournament.participants
  );
  if (error) return next(error.message);
  next();
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

function validateTournament() {
  const participantsSchema = {
    participants: Joi.array()
      .items(
        Joi.object({
          tournamentId: Joi.objectId().required(),
          teamName: Joi.string().required().default(" "),
          players: Joi.array()
            .items(
              Joi.object({
                _id: Joi.objectId().required(),
                name: Joi.string().required(),
              })
                .required()
                .default([])
            )
            .max(4)
            .min(3),
        })
          .required()
          .default("")
      )
      .max(24)
      .default([]),
  };

  const tournamentSchema = {
    tournament: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        poolPrize: Joi.string().required(),
        startsIn: Joi.string().required(),
        status: Joi.string().required(),
        participants: participantsSchema.participants,
        type: Joi.string().required(),
      })
    ),
  };

  const fullSchema = Joi.object({
    name: Joi.string().required(),
    tournament: tournamentSchema.tournament,
    type: Joi.string().required(),
  });

  return {
    validateFullSchema: (data) =>
      fullSchema.validate(data, { abortEarly: false }),
    validateTournamentSchema: (data) =>
      tournamentSchema.tournament.validate(data, { abortEarly: false }),
    validateParticipantsSchema: (data) => {
      console.log(data);
      return participantsSchema.participants.validate(data, {
        abortEarly: false,
      });
    },
  };
}

module.exports = { Tournament, validateTournament };
