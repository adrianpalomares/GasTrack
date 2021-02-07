/*
 * JWT Retrieval
 * Wrapper function is so we can
 * choose which routes will not be protected
 */

// TODO: Better error handling getRefreshedToken no jwt doesn't send back full err

// TODO: A method to authenticate and only allow if it is the specific user
// eg. A user wants to delete someone, can only delete themselves
const jwt = require("jsonwebtoken");

const User = require("../users/userModel");

// Could be /login route

// FIXME: Needs a try/catch block
exports.authenticateUser = async function (request, response) {
    const { username, password } = request.body;

    const currentUser = await User.findOne({ username: username });

    if (currentUser === null)
        response.json({ message: "User does not exist." }); // This error occured from not handling
    // the thrown error from async await
    // Create token
    if (currentUser.validatePassword(password)) {
        const accessToken = jwt.sign(
            {
                id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email,
                fullName: currentUser.fullName,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "10m" }
        );
        // ATM no expiration?
        const refreshToken = jwt.sign(
            { id: currentUser._id },
            process.env.JWT_REFRESH_SECRET
        );
        // FIXME: Make cookie have expiration
        response
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .json({ accessToken: accessToken });
    } else {
        response.json({ message: "Wrong username or password." });
    }
};

// TODO: Make route to get access token from refresh token
exports.getRefreshedAccessToken = async function (request, response) {
    //Verifying token
    try {
        // Get token from cookie and verify
        const decoded = jwt.verify(
            request.body.refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // Get user by id
        const currentUser = await User.findById(decoded.id);

        // Send new accessToken
        const newAccessToken = jwt.sign(
            {
                id: currentUser._id,
                username: currentUser.username,
                email: currentUser.email,
                fullName: currentUser.fullName,
            },
            process.env.JWT_ACCESS_SECRET
        );
        response.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error(err);
        response.json({ err: err });
    }
};
