const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server/server.js");
const User = require("../../server/users/userModel");


chai.use(chaiHttp);

chai.should();

// Clears database
afterEach(function (done) {
    User.deleteMany({}).then(function () {
        done();
    });
});

describe("POST /api/users", function () {
    it("Should add a user to the database", function (done) {
        chai.request(server)
            .post("/api/users")
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "johndoe",
                password: "password123",
                email: "example@example.com",
            })
            .end(function (err, response) {
                response.should.have.status(201);
                response.should.be.json;
                response.body.should.be.a("object");
                response.body.should.have.property("_id");
                response.body.should.have.property("firstname");
                response.body.should.have.property("lastname");
                response.body.should.have.property("email");
                response.body.should.not.have.property("hash");
                done();
            });
    });
    // Test that there is a hash added to the database
    it("Should hash the password in the database", function (done) {
        const testUser = new User({
            firstname: "John",
            lastname: "Doe",
            password: "password",
            email: "example@example.com",
            username: "johndoe2",
        });

        testUser
            .save()
            .then(function (user) {
                user.should.have.property("_id");
                user.should.have.property("username");
                user.should.have.property("hash");
                user.should.have.property("email");
                user.should.have.property("firstname");
                user.should.have.property("lastname");
                done();
            })
            .catch(function (err) {
                console.log("\x1b[31m", err);
                done();
            });
    });

    it("Should have unique username.", function (done) {
        // Creating user
        chai.request(server)
            .post("/api/users")
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "johndoe",
                password: "password",
                email: "example@example.com",
            })
            .end(function (err, response) {
                // Making second user
                chai.request(server)
                    .post("/api/users")
                    .send({
                        firstname: "TESTING",
                        lastname: "test",
                        username: "johndoe",
                        password: "password",
                        email: "test@test.com",
                    })
                    .end(function (err, response) {
                        response.should.status(400);
                        response.body.should.have.property(
                            "message",
                            "Username already exists."
                        );
                        done();
                    });
            });
    });

    it("Should have a unique email.", function (done) {
        // Creating user
        chai.request(server)
            .post("/api/users")
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "johndoe324",
                password: "password",
                email: "example555@example.com",
            })
            .end(function (err, response) {
                // Making second user
                chai.request(server)
                    .post("/api/users")
                    .send({
                        firstname: "TESTING",
                        lastname: "test",
                        username: "johndoe12413",
                        password: "password",
                        email: "example555@example.com",
                    })
                    .end(function (err, response) {
                        response.should.status(400);
                        response.body.should.have.property(
                            "message",
                            "Email already exists."
                        );
                        done();
                    });
            });
    });
});

describe("GET /api/users", function () {
    it("Should GET all users", function (done) {
        chai.request(server)
            .get("/api/users")
            .end(function (err, response) {
                // console.log(response)
                response.should.have.status(200);

                done();
            });
    });
    it("Should get detailed user(/api/users/:id)", function (done) {
        // Adding a user to the database
        let userId = "";
        chai.request(server)
            .post("/api/users")
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "johndoe2213",
                password: "password123",
                email: "example2323@example.com",
            })
            .end(function (err, response) {
                response.body.should.have.property("_id");
                // Setting user id for use in test
                userId = response.body._id;
                // Second request to verify
                chai.request(server)
                    .get(`/api/users/${userId}`)
                    .end(function (err, response) {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("firstname", "John");
                        response.body.should.have.property("lastname", "Doe");
                        response.body.should.have.property(
                            "email",
                            "example2323@example.com"
                        );
                        response.body.should.have.property("createdAt");
                        response.body.should.have.property("updatedAt");
                        done();
                    });
            });
    });

    it("Should return 404 when user not found.", function (done) {
        chai.request(server)
            .get(`/api/users/000000000000000000000000`)
            .end(function (err, response) {
                response.status.should.equal(404);
                response.body.should.be.an("object");
                response.body.should.have.property(
                    "message",
                    "User not found."
                );
                done();
            });
    });
});

describe("PUT /api/users/:id", function () {
    it("Should update a user", function (done) {
        // Adding user
        let user_id = "";

        chai.request(server)
            .post("/api/users")
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "johndoe",
                password: "password123",
                email: "example@example.com",
            })
            .end(function (err, response) {
                user_id = response.body._id;

                // Nested the request to get user id
                chai.request(server)
                    .put(`/api/users/${user_id}`)
                    .send({
                        firstname: "Jane",
                        lastname: "Doey",
                        password: "password1234",
                        email: "example2@example.com",
                    })
                    .end(function (err, res) {
                        // Tests are here
                        res.body.should.have.property("firstname", "Jane");
                        res.body.should.have.property("lastname", "Doey");
                        res.body.should.not.have.property(
                            "password",
                            "password1234"
                        );
                        res.body.should.have.property(
                            "email",
                            "example2@example.com"
                        );
                        done();
                    });
            });
    });

    it("Should return 404 when user is not found", function (done) {
        chai.request(server)
            .put("/api/users/000000000000000000000000")
            .send({
                firstname: "Jack",
            })
            .end(function (err, res) {
                res.status.should.equal(404);
                res.body.should.have.property("message", "User not found.");
                done();
            });
    });
});

// TODO: Make a get request to make sure it was deleted
describe("DELETE /api/users/:id", function () {
    it("Should remove a user", function (done) {
        // Adding a user first
        chai.request(server)
            .post("/api/users/")
            .send({
                firstname: "John",
                lastname: "Doe",
                username: "johndoe",
                password: "password123",
                email: "example@example.com",
            })
            .end(function (err, response) {
                chai.request(server)
                    .delete(`/api/users/${response.body._id}`)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property("_id", response.body._id);
                        res.body.should.have.property("firstname", "John");
                        res.body.should.have.property("lastname", "Doe");
                        res.body.should.have.property(
                            "email",
                            "example@example.com"
                        );
                        done();
                    });
            });
    });
});
