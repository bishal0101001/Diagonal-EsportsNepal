const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddlewares");

const {
  registerUser,
  authUser,
  verifyUser,
  verifyEmail,
  listUser,
  sendRequest,
  cancelRequest,
  acceptRequest,
  removeFriend,
  decryptUserDetails,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/verify/:email").put(protect, verifyEmail);
router.route("/verify/:id").get(protect, verifyUser);
router.route("/search/").get(protect, listUser);
router.post("/request/", protect, sendRequest);
router.post("/cancel/", protect, cancelRequest);
router.post("/accept/", protect, acceptRequest);
router.post("/remove/", protect, removeFriend);
router.post("/decrypt/", decryptUserDetails);

module.exports = router;
