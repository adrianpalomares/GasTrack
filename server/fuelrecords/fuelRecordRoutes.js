const express = require("express");
const router = express.Router();

const fuelRecordController = require("./fuelRecordController");

router.get("/", fuelRecordController.fuelRecordList);

router.get("/:id", fuelRecordController.fuelRecordDetail);

router.post("/", fuelRecordController.fuelRecordCreate);

router.put("/:id", fuelRecordController.fuelRecordUpdate);

router.delete("/:id", fuelRecordController.fuelRecordDelete);

module.exports = router;
