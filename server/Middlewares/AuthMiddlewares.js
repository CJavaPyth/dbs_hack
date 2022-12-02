const User = require('../Models/UserModel');

const jwt = require("jsonwebtoken");    // check if jwt is correct

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;      // get jwt from cookies from frontend
    if (token) {
        jwt.verify(token, "dev", async (err, decodedToken) => {
            if (err) {
                res.json({status: false})
                next();
            } else {
                const user = await User.findById(decodedToken.id)    // we have an ID inside the jwt
                if (user) {
                    res.json({status: true, user: user.email});
                }
                else {
                    res.json({status: false});
                    next();
                }
            }
        })
    } else {
        res.json({status: false});
        next();
    }
}