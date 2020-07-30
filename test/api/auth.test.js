const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server/server");

const User = require("../../server/models/userModel");

// Function to create a user
async function createUser() {
    const user = await User.create({
        firstname: "John",
        lastname: "Doe",
        email: "example@example.com",
        username: "jdoe2",
    });

    user.setPassword("password");

    await user.save();

    return user;
}

describe("POST /api/auth/token", function () {
    it("Should return a token", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const res = await chai
                    .request(server)
                    .post("/api/auth/token")
                    .send({
                        username: "jdoe2",
                        password: "password",
                    });
                // TODO: Test for contents of payload
                res.body.should.have.property("accessToken");
                // console.log(res);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});

describe("POST /api/auth/refresh", function () {
    it("Should refresh a token w/ refreshToken", async function () {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await createUser();
                const res = await chai
                    .request(server)
                    .post("/api/auth/token")
                    .send({ username: "jdoe2", password: "password" });
                const accessToken = res.body.accessToken;
                const refreshToken = res.headers["set-cookie"]
                    .pop()
                    .split(";")[0]; // refreshToken={REFRESHTOKEN}

                const refreshResponse = await chai
                    .request(server)
                    .post("/api/auth/refresh")
                    .send({ refreshToken: refreshToken.split("=")[1] });
                refreshResponse.body.should.have.property("accessToken");
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
});
