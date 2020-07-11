const config = {};

config.mongoURI = {
    development: "mongodb://localhost:27017/gastrack",
    test: "mongodb://localhost:27017/gastrack-test",
    production: process.env.MONGODB_URI
};

module.exports = config;