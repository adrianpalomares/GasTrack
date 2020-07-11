const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server/server");

const Maintenance = require("../../server/models/maintenanceModel");
const User = require("../../server/models/userModel");
const Car = require("../../server/models/carModel");

// Clears up the database after each test
afterEach(function (done) {
    Maintenance.deleteMany({}).then(function () {
        done();
    });
});

async function createUser() {
    const user = await User.create({
        firstname: "Jane",
        lastname: "Doe",
        username: "jdoe2",
        email: "example@example.com",
    });
    return user;
}

async function createCar(user) {
    const car = await Car.create({
        make: "Mazda",
        model: "Miata",
        modelYear: 1990,
        carName: "My MX5",
        licensePlate: "ACDE123",
        vin: "FSDFSDF12412",
        user: user._id,
    });
    return car;
}

describe("Maintenance model", function () {
    it("Should create a maintenance record.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const car = await createCar(user);
                const maintenanceRecord = await Maintenance.create({
                    user: user._id,
                    car: car._id,
                    date: new Date(),
                    odometer: 12332,
                    type: "tires",
                    locationOfMaintenance: "LA",
                    notes: "Changed tires.",
                    cost: 1223,
                });
                maintenanceRecord.should.have.property("_id");
                maintenanceRecord._id.toString().should.have.lengthOf(24);
                maintenanceRecord.should.have.property("user", user._id);
                maintenanceRecord.should.have.property("car", car._id);
                maintenanceRecord.should.have.property("date");
                maintenanceRecord.should.have
                    .property("odometer", 12332)
                    .and.be.a("number");
                maintenanceRecord.should.have.property("type", "tires");
                maintenanceRecord.should.have.property(
                    "locationOfMaintenance",
                    "LA"
                ),
                    maintenanceRecord.should.have.property(
                        "notes",
                        "Changed tires."
                    );
                maintenanceRecord.should.have.property("cost");

                maintenanceRecord.should.have.property("createdAt");
                maintenanceRecord.should.have.property("updatedAt");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it("Should return cost in the proper format.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const car = await createCar(user);
                const maintenanceRecord = await Maintenance.create({
                    user: user._id,
                    car: car._id,
                    date: new Date(),
                    odometer: 12345,
                    type: "Oil Change",
                    locationOfMaintenance: "Bob's Auto Shop",
                    notes: "Used Mobil 10w-40",
                    cost: 41.99
                })
                maintenanceRecord.cost.should.equal("41.99")

                const maintenanceRecord2 = await Maintenance.create({
                    user: user._id,
                    car: car._id,
                    date: new Date(),
                    odometer: 12345,
                    type: "Oil Change",
                    locationOfMaintenance: "Bob's Auto Shop",
                    notes: "Used Mobil 10w-40",
                    cost: 4100
                })
                maintenanceRecord2.cost.should.equal("4100.00")
                resolve()
            } catch (err) {
                reject(err);
            }
        })
    });
});
