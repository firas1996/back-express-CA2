const { createUser, getAllUsers } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getAllUsers);

module.exports = router;
