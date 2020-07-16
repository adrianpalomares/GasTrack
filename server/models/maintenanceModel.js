const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
        date: { type: Date, default: Date.now },
        odometer: Number,
        type: String,
        locationOfMaintenance: String,
        notes: String,
        cost: Number,
    },
    { timestamps: true }
);

/** 
* Converts cost into appropriate formats. A getter method for cost.
* @param {number} number - The price to get
* @return {string} It will return the price in the correct format
eg. 10.99.
*/
MaintenanceSchema.path("cost").get(function (number) {
    return (number / 100).toFixed(2);
});

/** 
* Converts cost into appropriate formats. A setter method for cost.
* @return It will return the price in the correct format,
eg. 1099
*/
MaintenanceSchema.path("cost").set(function (number) {
    return number * 100;
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);
