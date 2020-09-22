const { model } = require("../models/fuelRecordModel");
const FuelRecord = require("../models/fuelRecordModel");

exports.fuelRecordList = async function (request, response) {
    try {
        const results = await FuelRecord.find({});
        response.status(200).json({ message: "It works!" });
    } catch (err) {
        console.log(err);
        response.status(400).json(err);
    }
};
