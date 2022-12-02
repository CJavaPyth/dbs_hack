const UserModel = require("../Models/UserModel");

const handleErrors = (err) => {
    let errors = {email: "", password: ""};

    if (err.message === "incorrect email") errors.email = "that email is not registered";
    if (err.message === "incorrect password") errors.password = "that password is incorrect";

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors
    }
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

module.exports.register = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.create({email, password});
        const token = createToken(user._id)     // make sure it is _id

        res.cookie("jwt", token, {      // pass token into cookie
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })  
        res.status(201).json({user: user._id, created: true})
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created:false})
    }
};

const jwt = require("jsonwebtoken");
const maxAge = 3*24*60*60       // 3 days expiry
const createToken = (id) => {
    return jwt.sign({id}, "dev", {
        expiresIn: maxAge,
    });
}



module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id)     // make sure it is _id

        res.cookie("jwt", token, {      // pass token into cookie
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })  
        res.status(200).json({user: user._id, created: true})
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created:false})
    }
};

// module.exports.update = async (req, res, next) => {
//     try {
//         const updatedPost = await UserModel.updateOne(
//             {_id: req}
//         )
//     } catch (err) {

//     }
// }

