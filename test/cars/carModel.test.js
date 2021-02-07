const chai = require("chai");
const chaiHttp = require("chai-http");

const User = require("../../server/users/userModel");
const Car = require("../../server/cars/carModel");

chai.use(chaiHttp);

chai.should();

// Helper function to create a User
async function createUser() {
    const user = await User.create({
        firstname: "John",
        lastname: "Doe",
        username: "test",
        email: "example@example.com",
        password: "password",
    });
    return user;
}

describe("Car model test", function () {
    it("Should create a car", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();

                const car = await Car.create({
                    make: "Mazda",
                    model: "Miata",
                    modelYear: 1990,
                    carName: "My MX5",
                    licensePlate: "ACDE123",
                    vin: "FSDFSDF12412",
                    user: user._id,
                });

                // Tests
                car.should.be.a("object");
                car.should.have.property("make", "Mazda");
                car.should.have.property("model", "Miata");
                car.should.have.property("modelYear", 1990).to.be.a("number");
                car.should.have.property("carName", "My MX5");
                car.should.have.property("licensePlate", "ACDE123");
                car.should.have.property("vin", "FSDFSDF12412");
                car.should.have.property("user", user._id);
                resolve();
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    });
});
