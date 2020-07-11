const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    modelYear: Number,
    carName: String,
    licensePlate: String,
    vin: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Car", CarSchema);
