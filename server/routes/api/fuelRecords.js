const express = require("express");
const router = express.Router();

const fuelRecordController = require("../../controllers/fuelRecordController");

router.get("/:id", fuelRecordController.fuelRecordList);

module.exports = router;
