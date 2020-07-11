/*
 * This middleware is responsible for making sure users
 * are authenticated.
 * This is done by verifying the token(JWT).
 */

const jwt = require('jsonwebtoken');

const isAuthenticated = function (request, response, next) {
    // If not verified return 403
    const token = request.path;
    // else next()
};

module.exports = isAuthenticated;