const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server/server.js");
const User = require("../../server/users/userModel");

chai.should();

describe("User Model", function () {
    it("Should create a user.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await User.create({
                    firstname: "Jane",
                    lastname: "Doe",
                    email: "example@example.com",
                    username: "jane23",
                });
                user.setPassword("password");

                user.should.have.property("_id");
                user.should.have.property("firstname", "Jane");
                user.should.have.property("lastname", "Doe");
                user.should.have.property("email", "example@example.com");
                user.should.have.property("username", "jane23");
                user.should.have.property("hash");
                user.should.have.property("createdAt");
                user.should.have.property("updatedAt");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it("Should validate a password.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await User.create({
                    firstname: "Jane",
                    lastname: "Doe",
                    email: "example@example.com",
                    username: "jane23",
                });
                user.setPassword("password1234");
                const passwordValidationResultTrue = user.validatePassword(
                    "password1234"
                );

                const passwordValidationResultFalse = user.validatePassword(
                    "passwrd134"
                );

                passwordValidationResultTrue.should.be.true;
                passwordValidationResultFalse.should.be.false;

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it("Should not return the hash when returned in JSON format.", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await User.create({
                    firstname: "John",
                    lastname: "Doe",
                    email: "example@example.com",
                    username: "jdoe123",
                });

                const userJSON = user.toJSON();

                userJSON.should.not.have.property("hash");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });

    it("Should return the full name.", function (done) {
        User.create({
            firstname: "Jane",
            lastname: "Doe",
            username: "jdoe2",
            email: "jdoe@example.com",
        }).then(function (user) {
            user.fullName.should.be.equal("Jane Doe");
            done();
        });
    });

    it("Should require an email.", function (done) {
        User.create({
            firstname: "Jane",
            lastname: "Doe",
            username: "test",
        }).catch(function (err) {
            err.should.have.property("_message");
            err.should.have.property("errors");
            err.should.not.be.empty;
            done();
        });
    });

    it("Should require a username.", function (done) {
        User.create({
            firstname: "Jane",
            lastname: "Doe",
            email: "test@test.com",
        }).catch(function (err) {
            err.should.have.property("_message");
            err.should.have.property("errors");
            err.should.not.be.empty;
            done();
        });
    });

    it("Should have unique email.", function (done) {
        User.create(
            {
                fistname: "John",
                lastname: "Doe",
                username: "johndoe",
                password: "password",
                email: "test@test.com",
            },
            function (err, user) {
                // Creating second user to compare
                User.create(
                    {
                        firstname: "Jane",
                        lastname: "Doe",
                        email: "test@test.com",
                        password: "password",
                        username: "janedoe",
                    },
                    function (err, user) {
                        // Will throw error because of duplicate email
                        err.should.not.be.empty;
                        (user === undefined).should.be.true;
                        err.errors.should.have.property("email");
                        done();
                    }
                );
            }
        );
    });

    it("Should have unique username.", function (done) {
        User.create(
            {
                firstname: "John",
                lastname: "Doe",
                username: "johndoe57",
                password: "password",
                email: "tester@tester.com",
            },
            function (err, user) {
                // Creating second user
                User.create(
                    {
                        firstname: "Jane",
                        lastname: "Doe",
                        username: "johndoe57",
                        password: "password",
                        email: "thetest@test.com",
                    },
                    function (err, user) {
                        err.should.not.be.empty;
                        (user === undefined).should.be.true;
                        err.errors.should.have.property("username");
                        done();
                    }
                );
            }
        );
    });
});
