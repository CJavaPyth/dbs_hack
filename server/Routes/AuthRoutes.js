const { register, login } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const AuthRoutes = require("express").Router();

AuthRoutes.post("/", checkUser);
AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);


// router.patch("/postId", update);

module.exports = AuthRoutes;
