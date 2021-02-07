const express = require("express");

const app = express();
const mongoose = require("mongoose");

const config = require("./_config.js");

const cors = require("cors");

// Connecting mongoose
mongoose.connect(config.mongoURI[process.env.NODE_ENV], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(express.json());
app.use(cors());

// Including routes
const userRoutes = require("./users/userRoutes");
const carRoutes = require("./cars/carRoutes");
const authRoutes = require("./routes/api/auth");
const fuelRecordRoutes = require("./routes/api/fuelRecords");

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fuelrecords", fuelRecordRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log(`Running on port: ${PORT}`);
});

module.exports = app;
