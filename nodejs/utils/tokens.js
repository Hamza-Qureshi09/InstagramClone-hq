const jwt = require("jsonwebtoken");


module.exports = (userId,  secret, algorithum, audience, issuer, expireTime) => {
    return jwt.sign({ _id: userId }, secret, {
        // expiresIn: "30d"
        algorithm: algorithum,//"HS256",//"HS384"
        audience: audience,
        issuer: issuer,
        expiresIn: expireTime
    });
}