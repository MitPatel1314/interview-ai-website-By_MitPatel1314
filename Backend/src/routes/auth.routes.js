const express = require("express");

const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.registerUserController);

authRouter.post("/login", authController.loginUserController);

authRouter.get("/logout", authController.logoutUserController);

authRouter.get("/get-me", authController.getMeController);

module.exports = authRouter;


// const { Router } = require('express')
// const authController = require("../controllers/auth.controller")
// const authMiddleware = require("../middlewares/auth.middleware")
// const authRouter = Router()
// /**
//  * @route POST /api/auth/register
//  * @description Register a new user
//  * @access Public
//  */
// authRouter.post("/register", authController.registerUserController)
// /**
//  * @route POST /api/auth/login
//  * @description login user with email and password
//  * @access Public
//  */
// authRouter.post("/login", authController.loginUserController)
// /**
//  * @route GET /api/auth/logout
//  * @description clear token from user cookie and add the token in blacklist
//  * @access public
//  */
// authRouter.get("/logout", authController.logoutUserController)
// /**
//  * @route GET /api/auth/get-me
//  * @description get the current logged in user details
//  * @access private
//  * @description get the current logged in user details, or null if logged out
//  * @access public
//  */
// authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)
// authRouter.get("/get-me", authController.getMeController)
// module.exports = authRouter


// const { Router } = require('express')
// const authController = require("../controllers/auth.controller")

// const authRouter = Router()

// /**
//  * @route POST /api/auth/register
//  * @description Register a new user
//  * @access Public
//  */
// authRouter.post("/register", authController.registerUserController)


// /**
//  * @route POST /api/auth/login
//  * @description login user with email and password
//  * @access Public
//  */
// authRouter.post("/login", authController.loginUserController)


// /**
//  * @route GET /api/auth/logout
//  * @description clear token from user cookie and add the token in blacklist
//  * @access public
//  */
// authRouter.get("/logout", authController.logoutUserController)


// /**
//  * @route GET /api/auth/get-me
//  * @description get the current logged in user details, or null if logged out
//  * @access public
//  */
// authRouter.get("/get-me", authController.getMeController)


// module.exports = authRouter