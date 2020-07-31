const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
// TODO: Make password hashing asynchronous

const UserSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        hash: String,
        profileImage: String,
    },
    // Adds createdAt and updatedAt fields
    { timestamps: true }
);

/**
 * A method to set the User's password
 * @param {string} password - The plain text password to hash
 */
UserSchema.methods.setPassword = function (plainTextPassword) {
    // Generating the hash value
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
    this.hash = hashedPassword;
};

/**
 * A method to validate password
 * @param {string} password - The plain text password to compare
 */
UserSchema.methods.validatePassword = function (plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.hash);
};

/**
 * @returns The user's full name
 */
UserSchema.virtual("fullName").get(function () {
    return `${this.firstname} ${this.lastname}`;
});

/**
 * Returns data in json format. Excludes the user's hash.
 */
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.hash;
    return obj;
};

/**
 * Adding validator
 * */
UserSchema.plugin(uniqueValidator);

// Exporting the model for use elsewhere
module.exports = mongoose.model("User", UserSchema);
