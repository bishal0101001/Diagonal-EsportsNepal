const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    poolPrize: {
      type: String,
      required: true,
    },
    // img: {
    //   type: String,
    //   required: true
    // },
    type: {
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
    participants: [
      {
        type: Object,
        teamName: {
          type: String,
          required: true,
        },
        players: {
          type: [
            {
              user: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "User",
                required: true,
                default: {},
              },
            },
          ],
        },
        required: true,
        default: {},
      },
    ],
    participants: [
      {
        type: Object,
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "User",
          required: true,
          default: {},
        },
        required: true,
        default: {},
      },
    ],
  },
  { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

function validateTournament(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    tournament: Joi.object({
      name: Joi.string().required(),
      poolPrize: Joi.string().required(),
      startsIn: Joi.string().required(),
      status: Joi.string().required(),
      participants: Joi.array()
        .items(
          Joi.object().keys({
            teamName: Joi.string().required(),
            players: Joi.array()
              .items(
                Joi.object().keys({
                  user: Joi.objectId().required(),
                })
              )
              .max(4),
          })
        )
        .max(24),
    }).required(),
    type: Joi.string().required(),
  });

  return schema.validate(data);
}

module.exports = { Tournament, validateTournament };
