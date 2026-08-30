const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
};

// Register User
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message:
                    "Account already exists with this email address or username"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Login User
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "User loggedIn successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Logout User
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token });
        }

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get Current User
async function getMeController(req, res) {
    try {
        const token = req.cookies.token;

        // User is not logged in
        if (!token) {
            return res.status(200).json({
                message: "No active session",
                user: null
            });
        }

        // Check blacklist
        const isTokenBlacklisted =
            await tokenBlacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(200).json({
                message: "No active session",
                user: null
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(200).json({
                message: "No active session",
                user: null
            });
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Get Me error:", error);

        return res.status(200).json({
            message: "No active session",
            user: null
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};


// const userModel = require("../models/user.model")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const tokenBlacklistModel = require("../models/blacklist.model")
// const cookieOptions = {
//     httpOnly: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 24 * 60 * 60 * 1000
// }
// /**
//  * @name registerUserController
//  * @description register a new user, expects username, email and password in the request body
//  * @access Public
//  */
// async function registerUserController(req, res) {
//     const { username, email, password } = req.body
//     if (!username || !email || !password) {
//         return res.status(400).json({
//             message: "Please provide username, email and password"
//         })
//     }
//     const isUserAlreadyExists = await userModel.findOne({
//         $or: [ { username }, { email } ]
//     })
//     if (isUserAlreadyExists) {
//         return res.status(400).json({
//             message: "Account already exists with this email address or username"
//         })
//     }
//     const hash = await bcrypt.hash(password, 10)
//     const user = await userModel.create({
//         username,
//         email,
//         password: hash
//     })
//     const token = jwt.sign(
//         { id: user._id, username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )
//     res.cookie("token", token, cookieOptions)
//     res.status(201).json({
//         message: "User registered successfully",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })
// }
// /**
//  * @name loginUserController
//  * @description login a user, expects email and password in the request body
//  * @access Public
//  */
// async function loginUserController(req, res) {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.status(400).json({
//             message: "Please provide email and password"
//         })
//     }
//     const user = await userModel.findOne({ email })
//     if (!user) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password)
//     if (!isPasswordValid) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }
//     const token = jwt.sign(
//         { id: user._id, username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )
//   res.cookie("token", token, cookieOptions)
//     res.status(200).json({
//         message: "User loggedIn successfully.",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })
// }
// /**
//  * @name logoutUserController
//  * @description clear token from user cookie and add the token in blacklist
//  * @access public
//  */
// async function logoutUserController(req, res) {
//     const token = req.cookies.token
//     if (token) {
//         await tokenBlacklistModel.create({ token })
//     }
//     res.clearCookie("token", { httpOnly: true, sameSite: "lax" })
//     res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" })
//     res.status(200).json({
//         message: "User logged out successfully"
//     })
// }
// /**
//  * @name getMeController
//  * @description get the current logged in user details.
//  * @access private
//  * @description get the current logged in user details, or null if there is no session.
//  * @access public
//  */



// async function getMeController(req, res) {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(200).json({
//                 message: "No active session",
//                 user: null
//             });
//         }

//         const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

//         if (isTokenBlacklisted) {
//             return res.status(200).json({
//                 message: "No active session",
//                 user: null
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await userModel.findById(decoded.id);

//         if (!user) {
//             return res.status(200).json({
//                 message: "No active session",
//                 user: null
//             });
//         }

//         return res.status(200).json({
//             message: "User details fetched successfully",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         });
//     }
// }



// module.exports = {
//     registerUserController,
//     loginUserController,
//     logoutUserController,
//     getMeController
// }






// const userModel = require("../models/user.model")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const tokenBlacklistModel = require("../models/blacklist.model")

// const cookieOptions = {
//     httpOnly: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 24 * 60 * 60 * 1000
// }

// /**
//  * @name registerUserController
//  * @description register a new user, expects username, email and password in the request body
//  * @access Public
//  */
// async function registerUserController(req, res) {

//     const { username, email, password } = req.body

//     if (!username || !email || !password) {
//         return res.status(400).json({
//             message: "Please provide username, email and password"
//         })
//     }

//     const isUserAlreadyExists = await userModel.findOne({
//         $or: [ { username }, { email } ]
//     })

//     if (isUserAlreadyExists) {
//         return res.status(400).json({
//             message: "Account already exists with this email address or username"
//         })
//     }

//     const hash = await bcrypt.hash(password, 10)

//     const user = await userModel.create({
//         username,
//         email,
//         password: hash
//     })

//     const token = jwt.sign(
//         { id: user._id, username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )

//     res.cookie("token", token, cookieOptions)


//     res.status(201).json({
//         message: "User registered successfully",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })

// }


// /**
//  * @name loginUserController
//  * @description login a user, expects email and password in the request body
//  * @access Public
//  */
// async function loginUserController(req, res) {

//     const { email, password } = req.body

//     if (!email || !password) {
//         return res.status(400).json({
//             message: "Please provide email and password"
//         })
//     }

//     const user = await userModel.findOne({ email })

//     if (!user) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password)

//     if (!isPasswordValid) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }

//     const token = jwt.sign(
//         { id: user._id, username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )

//     res.cookie("token", token, cookieOptions)
//     res.status(200).json({
//         message: "User loggedIn successfully.",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })
// }


// /**
//  * @name logoutUserController
//  * @description clear token from user cookie and add the token in blacklist
//  * @access public
//  */
// async function logoutUserController(req, res) {
//     const token = req.cookies.token

//     if (token) {
//         await tokenBlacklistModel.create({ token })
//     }

//     res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" })

//     res.status(200).json({
//         message: "User logged out successfully"
//     })
// }

// /**
//  * @name getMeController
//  * @description get the current logged in user details, or null if there is no session.
//  * @access public
//  */
// async function getMeController(req, res) {
//     const token = req.cookies.token

//     if (!token) {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         })
//     }

//     const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

//     if (isTokenBlacklisted) {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await userModel.findById(decoded.id)

//         if (!user) {
//             return res.status(200).json({
//                 message: "No active session",
//                 user: null
//             })
//         }

//         return res.status(200).json({
//             message: "User details fetched successfully",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         })
//     } catch {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         })
//     }
// }



// module.exports = {
//     registerUserController,
//     loginUserController,
//     logoutUserController,
//     getMeController
// }








// async function getMeController(req, res) {
//     const token = req.cookies.token
//     const user = await userModel.findById(req.user.id)
//     if (!token) {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         })
//     }
//     if (!user) {
//         return res.status(401).json({
//             message: "User not found."
//     const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })
//     if (isTokenBlacklisted) {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         })
//     }
//     res.status(200).json({
//         message: "User details fetched successfully",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await userModel.findById(decoded.id)
//         if (!user) {
//             return res.status(200).json({
//                 message: "No active session",
//                 user: null
//             })
//         }
//     })
//         return res.status(200).json({
//             message: "User details fetched successfully",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         })
//     } catch {
//         return res.status(200).json({
//             message: "No active session",
//             user: null
//         })
//     }
// }