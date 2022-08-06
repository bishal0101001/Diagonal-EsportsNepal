const router = require("express").Router();

const {
  createTournamentSchema,
  createTournament,
  registerForSquadTournament,
  testRoutes,
} = require("../controllers/tournamentController");
const {
  getTournamentData,
} = require("../controllers/tournamentDataController");

const { protect, admin } = require("../middleware/authMiddlewares");
const validateObjectId = require("../middleware/validateObjectId");

router.route("/create").post(protect, admin, createTournamentSchema);
router.route("/create/:id").post(protect, admin, createTournament);

// router.route("/:id").post(validateObjectId, protect, registerForSquadTournament);
router.route("/").post(protect, registerForSquadTournament);

router.get("/", getTournamentData);

module.exports = router;
