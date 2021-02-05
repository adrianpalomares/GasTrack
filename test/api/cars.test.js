const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server/server.js");
const User = require("../../server/users/userModel");

const Car = require("../../server/models/carModel");

chai.use(chaiHttp);

chai.should();

// Clear database after each test
afterEach(function (done) {
    Car.deleteMany({}).then(function () {
        User.deleteMany({}).then(function () {
            done();
        });
    });
});

/*  HELPER FUNCTIONS  */

// Function to create a user
async function createUser() {
    const user = await User.create({
        firstname: "John",
        lastname: "Doe",
        email: "example@example.com",
        username: "test",
        password: "password",
    });
    return user;
}
async function createUser2() {
    const user = await User.create({
        firstname: "Jane",
        lastname: "Doe",
        email: "examplejane@example.com",
        username: "testjane",
        password: "password",
    });
    return user;
}
// Function to create a car
async function createCar(user) {
    const car = await Car.create({
        make: "Mazda",
        model: "Miata",
        modelYear: 1990,
        carName: "My MX5",
        licensePlate: "123ABCD",
        vin: "SDHFSDIOF123",
        user: user._id,
    });
    return car;
}

async function createCarByPost(user) {
    const response = chai.request(server).post("/api/cars").send({
        make: "Mazda",
        model: "Miata",
        modelYear: 1990,
        carName: "My MX5",
        licensePlate: "123ABCD",
        vin: "SDHFSDIOF123",
        user: user._id,
    });
    return response;
}

describe("POST /api/cars", function () {
    it("Should create a user through a POST request.", async function () {
        // Have to return a promise since async await
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();

                const res = await chai.request(server).post("/api/cars").send({
                    make: "Mazda",
                    model: "Miata",
                    modelYear: 1990,
                    carName: "My MX5",
                    licensePlate: "123ABCD",
                    vin: "SDHFSDIOF123",
                    user: user._id,
                });

                res.body.should.have.property("make", "Mazda");
                res.body.should.have.property("_id").be.a("string");
                res.body.should.have.property("model", "Miata");
                res.body.should.have.property("modelYear", 1990).be.a("number");
                res.body.should.have.property("carName", "My MX5");
                res.body.should.have.property("licensePlate", "123ABCD");
                res.body.should.have.property("vin", "SDHFSDIOF123");
                res.body.should.have.property("user").have.length(24);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});

describe("GET /api/cars", function () {
    it("Should get all cars.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const carOne = await createCar(user);
                const carTwo = await createCar(user);
                const response = await chai.request(server).get("/api/cars");

                response.should.have.status(200);
                response.body.should.be.an("array");
                response.body.should.have.length(2);

                // Testing the contents of the response array
                response.body[0].should.have.property("_id").have.length(24);
                response.body[1].should.have.property("_id").have.length(24);

                response.body[0].should.have.property("make", "Mazda");
                response.body[1].should.have.property("make", "Mazda");

                response.body[0].should.have.property("model", "Miata");
                response.body[1].should.have.property("model", "Miata");

                response.body[0].should.have.property("carName", "My MX5");
                response.body[1].should.have.property("carName", "My MX5");

                response.body[0].should.have.property(
                    "licensePlate",
                    "123ABCD"
                );
                response.body[1].should.have.property(
                    "licensePlate",
                    "123ABCD"
                );

                response.body[0].should.have.property("vin", "SDHFSDIOF123");
                response.body[1].should.have.property("vin", "SDHFSDIOF123");

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it("Should return a detailed car by id.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const createCarResponse = await createCarByPost(user);
                const carId = createCarResponse.body._id;

                const response = await chai
                    .request(server)
                    .get(`/api/cars/${carId}`);

                response.should.have.status(200);
                response.body.should.have.property("_id").and.to.be.length(24);
                response.body.should.have.property("make", "Mazda");
                response.body.should.have.property("model", "Miata");
                response.body.should.have
                    .property("modelYear", 1990)
                    .and.be.a("number");
                response.body.should.have.property("carName", "My MX5");
                response.body.should.have.property("licensePlate", "123ABCD");
                response.body.should.have.property("vin", "SDHFSDIOF123");
                response.body.should.have
                    .property("user", user._id.toString())
                    .and.be.length(24);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it("Should return a 404 w/ message if car not found.", function (done) {
        chai.request(server)
            .get(`/api/cars/000000000000000000000000`)
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.should.have.property("message", "Car not found.");
                done();
            });
    });

    it("Should return results based on queries", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const user2 = await createUser2();

                const createCarResponse = await createCarByPost(user);
                const carId = createCarResponse.body._id;

                const response = await chai
                    .request(server)
                    .get(`/api/cars?user=${user.id}`);
                response.body.should.have.length(1);
                response.body[0].user.should.equal(user.id);

                const response2 = await chai
                    .request(server)
                    .get(`/api/cars?user=${user2.id}`);
                response2.body.should.have.length(0);

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});

describe("PUT /api/cars", function () {
    it("Should update a car.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const createCarResponse = await createCarByPost(user);
                const carId = createCarResponse.body._id;

                const res = await chai
                    .request(server)
                    .put(`/api/cars/${carId}`)
                    .send({
                        make: "Toyota",
                        model: "Supra",
                        modelYear: 2020,
                        carName: "Black Supra",
                        licensePlate: "5353535",
                        vin: "1111111121",
                    });

                res.should.have.status(200);
                res.body.should.have.property("make", "Toyota");
                res.body.should.have.property("model", "Supra");
                res.body.should.have.property("modelYear", 2020);
                res.body.should.have.property("carName", "Black Supra");
                res.body.should.have.property("licensePlate", "5353535");
                res.body.should.have.property("vin", "1111111121");

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});

describe("DELETE /api/cars", function () {
    it("Should delete a car.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const createCarResponse = await createCarByPost(user);
                const carId = createCarResponse.body._id;
                // Checking that the car is in the database
                const firstRes = await chai
                    .request(server)
                    .get(`/api/cars/${carId}`);
                firstRes.should.have.status(200);

                // Deleting and making sure it returns deleted car
                const secondRes = await chai
                    .request(server)
                    .delete(`/api/cars/${carId}`);
                // console.log(secondRes)
                secondRes.should.have.status(200);

                secondRes.body.should.have.property("make", "Mazda");
                secondRes.body.should.have.property("model", "Miata");
                secondRes.body.should.have.property("modelYear", 1990);
                secondRes.body.should.have.property("carName", "My MX5");
                secondRes.body.should.have.property("licensePlate", "123ABCD");
                secondRes.body.should.have.property("vin", "SDHFSDIOF123");
                secondRes.body.should.have
                    .property("user")
                    .which.has.length(24);

                // Checking to see that the car isn't in the database
                const thirdRes = await chai
                    .request(server)
                    .get(`/api/cars/${carId}`);
                thirdRes.should.have.status(404);
                thirdRes.body.should.have.property("message", "Car not found.");

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});
