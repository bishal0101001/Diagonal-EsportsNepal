const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    registeredForTournament: [
      {
        type: Object,
        tournament: { type: mongoose.SchemaTypes.ObjectId, ref: "Tournament" },
        required: true,
        default: {},
        time: { type: String },
      },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pool: {
      type: Object,
      required: true,
      default: {
        friendRequests: [],
        sentRequests: [],
        invitations: [],
      },
      friendRequests: [
        {
          type: Object,
          details: {
            _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
            timeStamp: Date.now(),
            status: { type: Boolean, default: false },
          },
          required: true,
          default: {},
        },
      ],
      sentRequests: [
        {
          type: Object,
          details: {
            _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
            timeStamp: Date.now(),
            status: { type: Boolean, default: false },
          },
          required: true,
          default: {},
        },
      ],
      invitations: [
        {
          type: Object,
          userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
          tournamentId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Tournament",
          },
        },
      ],
    },
    friends: [
      {
        type: Object,
        details: {
          _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
          username: String,
        },
        required: true,
        default: {},
      },
    ],
  },
  { minimize: false },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.pre(
//   "updateOne",
//   { document: true, query: false },
//   async function (next) {
//     console.log("updating...");
//     if (this.isModified("isAdmin verified"))
//       throw new Error("This system is unhackable mf.....");

//     const { error } = postValidation({
//       isAdmin: this.isAdmin,
//       verified: this.verified,
//       registeredForTournament: this.registeredForTournament,
//     });
//     console.log(error);

//     if (!error) return next();
//     throw new Error("This system is unhackable mf....");
//   }
// );

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

function validate(data) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10).required().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username is required`,
      "string.min": `Username should have at least 3 characters`,
      "string.max": `Username should not have more than 10 characters`,
      "any.required": `Username is mandatory`,
    }),
    email: Joi.string()
      .pattern(
        new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
      .required()
      .messages({
        "string.pattern.base": "Invalid Email",
      }),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      )
      .required()
      .messages({
        "string.pattern.base": "Invalid Password",
      }),
  });

  return schema.validate(data, { abortEarly: false });
}

// function postValidation(data) {
//   const schema = Joi.object({
//     verified: Joi.boolean().required(),
//     registeredForTournament: Joi.array()
//       .items(
//         Joi.object().keys({
//           tournament: Joi.objectId().required(),
//           time: Joi.date().required(),
//         })
//       )
//       .required(),
//     isAdmin: Joi.boolean().required(),
//   });

//   return schema.validate(data, { abortEarly: false });
// }

module.exports = { User, validate };
