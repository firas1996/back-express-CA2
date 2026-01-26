const {
  createUser,
  getAllUsers,
  getUserbyId,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getAllUsers);
router.get("/getOneUser/:id", getUserbyId);

module.exports = router;
