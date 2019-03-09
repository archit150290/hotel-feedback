const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const path = require('path');
module.exports = jwt

function jwt() {
    const secret = config.secret;
    // console.log(path);
    console.log(secret);
   
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/users/register'
        ]
    });
}


async function isRevoked(req, payload, done) {
    console.log(payload);
    
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};