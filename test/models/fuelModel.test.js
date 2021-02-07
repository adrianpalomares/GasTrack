const chai = require("chai");

const FuelRecord = require("../../server/models/fuelRecordModel");
const Car = require("../../server/cars/carModel");
const User = require("../../server/users/userModel");

chai.should();

// Creating car and user
async function createCar() {
    return new Promise((resolve, reject) => {
        User.create(
            {
                firstname: "Jane",
                lastname: "Doe",
                email: "example@example.com",
                username: "jane23",
            },
            function (err, user) {
                if (err) reject(err);
                Car.create(
                    {
                        user: user,
                        make: "Nissan",
                        model: "GTR",
                        modelYear: 2012,
                        carName: "My GTR",
                        licensePlate: "7DFEESS3",
                        vin: "19102FDS8SD",
                    },
                    function (err, car) {
                        if (err) reject(err);
                        resolve(car);
                    }
                );
            }
        );
    });
}

describe("Fuel Record Model", function () {
    it("Should create a fuel record.", function (done) {
        createCar().then((car) => {
            FuelRecord.create(
                {
                    car: car,
                    totalCost: 21.92,
                    pricePerGallon: 3.52,
                    gallons: 6.227,
                    fullTank: false,
                    date: new Date("2020-04-20T10:23:00"),
                    odometer: 23456,
                },
                function (err, fuelRecord) {
                    fuelRecord.should.have.property("_id");
                    fuelRecord.should.have.property("fullTank", false);
                    fuelRecord.should.have.property("car");
                    fuelRecord.car.should.be.an("object");
                    fuelRecord.should.have.property("totalCost", "21.92");
                    fuelRecord.should.have.property("pricePerGallon", "3.52");
                    fuelRecord.should.have.property("date");
                    fuelRecord.should.have.property("odometer", 23456);
                    fuelRecord.should.have.property("createdAt");
                    fuelRecord.should.have.property("updatedAt");
                    done();
                }
            );
        });
    });

    // This method should save value as whole number in database and
    // return a decimal value
    it("Should return proper formats for 'totalCost'.", function (done) {
        createCar().then((car) => {
            FuelRecord.create(
                {
                    car: car,
                    totalCost: 25.25,
                    pricePerGallon: 2.52,
                    gallons: 7.009,
                    fullTank: true,
                    date: new Date("2020-04-21T10:22:00"),
                    odometer: 1234,
                },
                function (err, fuelRecord) {
                    fuelRecord.totalCost.should.be.a("string");
                    (fuelRecord.totalCost === "25.25").should.be.true;
                    // Verifying if totalCost is stored as a whole number
                    FuelRecord.findById(fuelRecord._id)
                        .lean()
                        .exec(function (err, fuelRecord) {
                            fuelRecord.totalCost.should.be.a("number");
                            (fuelRecord.totalCost === 2525).should.be.true;
                            done();
                        });
                }
            );
        });
    });

    it("Should return proper formats for 'gallons'.", function (done) {
        createCar().then((car) => {
            FuelRecord.create(
                {
                    car: car,
                    totalCost: 25.25,
                    pricePerGallon: 2.52,
                    gallons: 7.009,
                    fullTank: true,
                    date: new Date("2020-04-21T10:22:00"),
                    odometer: 1234,
                },
                function (err, fuelRecord) {
                    fuelRecord.gallons.should.be.a("string");
                    (fuelRecord.gallons === "7.009").should.be.true;
                    // Verifying if totalCost is stored as a whole number
                    FuelRecord.findById(fuelRecord._id)
                        .lean()
                        .exec(function (err, fuelRecord) {
                            fuelRecord.gallons.should.be.a("number");
                            (fuelRecord.gallons === 7009).should.be.true;
                            done();
                        });
                }
            );
        });
    });

    it("Should return proper formats for 'pricePerGallon'.", function (done) {
        createCar().then((car) => {
            FuelRecord.create(
                {
                    car: car,
                    totalCost: 25.25,
                    pricePerGallon: 2.52,
                    gallons: 7.009,
                    fullTank: true,
                    date: new Date("2020-04-21T10:22:00"),
                    odometer: 1234,
                },
                function (err, fuelRecord) {
                    fuelRecord.pricePerGallon.should.be.a("string");
                    (fuelRecord.pricePerGallon === "2.52").should.be.true;
                    // Verifying if totalCost is stored as a whole number
                    FuelRecord.findById(fuelRecord._id)
                        .lean()
                        .exec(function (err, fuelRecord) {
                            fuelRecord.pricePerGallon.should.be.a("number");
                            (fuelRecord.pricePerGallon === 252).should.be.true;
                            done();
                        });
                }
            );
        });
    });
});
