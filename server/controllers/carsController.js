const Car = require("../models/carModel");

/* 
    make: String,
    model: String,
    modelYear: Number,
    carName: String,
    licensePlate: String,
    vin: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
*/
// TODO: Add ability to get all of users cars by id
exports.carList = async function (request, response) {
    try {
        const results = await Car.find({});
        response.status(200).json(results);
    } catch (err) {
        console.log(err);
        response.status(400).json(err);
    }
};

exports.carDetail = async function (request, response) {
    try {
        const car = await Car.findById(request.params.id);
        car == null
            ? response.status(404).json({ message: "Car not found." })
            : response.status(200).json(car);
        // response.status(200).json(car);
    } catch (err) {
        response.status(400).json(err);
    }
};

exports.carCreate = async function (request, response) {
    try {
        const newCar = await Car.create({
            make: request.body.make,
            model: request.body.model,
            modelYear: request.body.modelYear,
            carName: request.body.carName,
            licensePlate: request.body.licensePlate,
            vin: request.body.vin,
            user: request.body.user,
        });
        // Send the newUser in json format
        response.status(201).json(newCar);
    } catch (err) {
        console.log(err);
        response.json({ message: "Error creating user" });
    }
};

exports.carUpdate = async function (request, response) {
    try {
        // Will return the updated version of car ({new: true})
        const car = await Car.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true }
        );
        response.status(200).json(car);
    } catch (err) {
        response.status(400).json(err);
    }
};

exports.carDelete = async function (request, response) {
    try {
        const car = await Car.findByIdAndRemove({ _id: request.params.id });
        response.status(200).json(car);
    } catch (err) {
        response.status(400).json(err);
    }
};
