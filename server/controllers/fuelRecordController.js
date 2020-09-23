const FuelRecord = require("../models/fuelRecordModel");
const { search } = require("../routes/api/fuelRecords");

// TODO: Test all of these!
// TODO: Add the ability to limit and offset the results
exports.fuelRecordList = async function (request, response) {
    try {
        const LIMIT = request.query.limit ? parseInt(request.query.limit) : 10;
        const OFFSET = request.query.limit ? parseInt(request.query.offset) : 0;

        // The search object that will be passed into the query
        const searchQuery = {};

        // Checking if certain fields were added
        // to the request
        request.query.car ? (searchQuery.car = request.query.car) : "";

        const results = await FuelRecord.find(searchQuery, null, {
            skip: OFFSET,
        }).limit(LIMIT);

        response.status(200).json(results);
    } catch (err) {
        console.log(err);
        response.status(400).json(err);
    }
};

exports.fuelRecordDetail = async function (request, response) {
    try {
        const fuelRecord = await FuelRecord.findById(request.params.id);
        console.log(fuelRecord);
        fuelRecord == null
            ? response.status(404).json({ message: "Fuel Record not found." })
            : response.status(200).json(fuelRecord);
    } catch (err) {
        console.log(err);
        response.status(400).json(err);
    }
};

// Date will have to be provided in the form
exports.fuelRecordCreate = async function (request, response) {
    try {
        const fuelRecord = new FuelRecord({
            car: request.body.car,
            totalCost: request.body.totalCost,
            pricePerGallon: request.body.pricePerGallon,
            gallons: request.body.gallons,
            fullTank: request.body.fullTank,
            date: request.body.date,
            odometer: request.body.odometer,
        });
        const savedFuelRecord = await fuelRecord.save();
        response.status(201).json(savedFuelRecord);
    } catch (err) {
        console.log(err);
        response.status(400).json(err);
    }
};

exports.fuelRecordUpdate = async function (request, response) {
    try {
        const fuelRecord = await FuelRecord.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { returnOriginal: false }
        );
        fuelRecord === null
            ? response.status(404).json({ message: "Fuel Record not found." })
            : response.json(fuelRecord);
    } catch (err) {
        console.log(err);
        response.status(400).json(err);
    }
};

exports.fuelRecordDelete = async function (request, response) {
    try {
        const fuelRecord = await FuelRecord.findByIdAndRemove({
            _id: request.params.id,
        });
        response.status(200).json(fuelRecord);
    } catch (err) {
        response.status(400).json(err);
    }
};
