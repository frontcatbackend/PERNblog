const userRouter = require("express").Router();
const UserController = require("../controllers/user");

userRouter.post("/register", UserController.registration);
userRouter.post("/auth", UserController.auth);
// userRouter.get("/user/:id",UserController.checkUser)

module.exports = userRouter;
