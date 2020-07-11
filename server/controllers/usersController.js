const User = require("../models/userModel");

exports.userList = function (request, response) {
    User.findOne({}, function (err, docs) {
        if (err) {
            console.log(err);
            response.json(err);
        } else {
            response.json(docs);
        }
    });
};

exports.userDetail = function (request, response) {
    User.findOne({ _id: request.params.id })
        .then(function (user) {
            // console.log(user);
            response.json(user);
        })
        .catch(function (err) {
            console.log(err);
            console.log("NO user found");
            response.json(err);
        });
};

exports.userCreate = function (request, response) {
    try {
        const newUser = new User({
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            username: request.body.username,
            profileImage: request.body.profileImage,
        });
        newUser.setPassword(request.body.password);
        newUser.save();
        // Send the newUser in json format
        response.status(201).json(newUser);
    } catch (err) {
        response.json({ message: "Error creating user" });
    }
};

exports.userUpdate = async function (request, response) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { returnOriginal: false }
        );
        user == null
            ? response.status(404).json({ message: "User not found." })
            : response.json(user);
    } catch (err) {
        console.log("NODE: ", err);
        response.status(400).json(err);
    }
};

exports.userDelete = async function (request, response) {
    try {
        const user = await User.findByIdAndRemove({ _id: request.params.id });
        response.status(200).json(user);
    } catch (err) {
        // console.log("usersController: ", Object.keys(err));
        response.status(400).json(err);
    }
};
