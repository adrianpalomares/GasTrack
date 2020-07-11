const mongoose = require("mongoose");

const FuelRecordSchema = new mongoose.Schema(
    {
        car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
        totalCost: Number,
        pricePerGallon: Number,
        gallons: Number,
        fullTank: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },
        odometer: Number,
    },
    { timestamps: true }
);

/*
 * @param {number} number
 * @return {string} Returns the number in decimal form
 */
FuelRecordSchema.path("totalCost").get(function (number) {
    return (number / 100).toFixed(2);
});

/*
 * @param {number} number
 * @return {number} Stores the number as a whole number
 */
FuelRecordSchema.path("totalCost").set(function (number) {
    return number * 100;
});

/* 
* @return {string} Returns number of gallons in decimal form. 3 places
*/
FuelRecordSchema.path("gallons").get(function (number) {
    return (number / 1000).toFixed(3);
});

/* 
* Storing number as an interger in database.
* @return {number} Returns number of gallons as an Integer
*/
FuelRecordSchema.path("gallons").set(function (number) {
    return number * 1000;
});

FuelRecordSchema.path('pricePerGallon').get(function (number) {
    return (number / 100).toFixed(2);
})

FuelRecordSchema.path('pricePerGallon').set(function (number) {
    return number * 100;
})

module.exports = mongoose.model("FuelRecord", FuelRecordSchema);
