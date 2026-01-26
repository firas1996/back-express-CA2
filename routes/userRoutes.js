const {
  createUser,
  getAllUsers,
  getUserbyId,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getAllUsers);
router.get("/getOneUser/:id", getUserbyId);

router.patch("/updateUser/:id", UpdateUser);

router.delete("/DeleteUser/:id", DeleteUser);

module.exports = router;
