const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser,getUserById } = require("../controller/getUsers");
const {deleteUser} = require("../controller/deleteUser");
const {editUser} = require("../controller/editUser")
router.post("/createUser", createUser);
router.get("/getallUsers", getUser);
router.post("/getUserById", getUserById);
router.post("/deleteUser",deleteUser);
router.post("/editUser",editUser)

module.exports = router;
