const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userController = require('../../controllers/usersController');

// Importing models
const User = require("../../models/userModel");

router.get("/", userController.userList);

router.get("/:id", userController.userDetail);

router.post("/", userController.userCreate);

router.put("/:id", userController.userUpdate);

router.delete("/:id", userController.userDelete);

module.exports = router;
