const express = require("express");
const router = express.Router();
const carsController = require("./carController");

router.get("/", carsController.carList);

router.get("/:id", carsController.carDetail);

router.post("/", carsController.carCreate);

router.put("/:id", carsController.carUpdate);

router.delete("/:id", carsController.carDelete);

module.exports = router;
