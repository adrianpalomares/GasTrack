const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server/server.js");
const User = require("../../server/models/userModel");

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
});
