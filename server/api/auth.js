

require('dotenv').config()
const fs = require("fs");
const path = require("path");
let cors = require('cors')
let express = require('express')
let router = express.Router()
let bcrypt = require('bcrypt')
const formidable = require("formidable");

/* Import Controllers */
const usersController = require('../controllers/usersController')
const UserService = usersController.UserService
const User = require('../models/userSchema')

/* Validation */
const { check, body, validationResult } = require('express-validator')

/* Verify JWT */
const verifyJWT = require('../middleware/verifyJWT')

/* CORS */

const corsOptions = {
    origin: `${process.env.FRONTEND}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}
router.use(cors(corsOptions))


// Create JWT Token 
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN)
}



/* Create a new user using express validate for the form and bcyrpt to hash passwords */
router.post("/signup", [
    check("username", "Please enter a username at least 5 characters long")
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isLength({ min: 5 })
        .bail()
        .trim()
        .custom(value => {
            return UserService.find({
                username: value
            }).then(user => {
                if (user) {
                    throw new Error('Username already being used')
                }
            });
        }).bail(),
    check("email", "Please enter a valid email")
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isEmail()
        .bail()
        .normalizeEmail()
        .bail()
        .trim()
        .custom(value => {
            return UserService.find({
                email: value
            }).then(user => {
                if (user) {
                    throw new Error('Email is already being used')
                }
            });
        }).bail(),
    check("password", "A password must contain at least 8 Characters, 1 Uppercase Character, 1 lowercase character, 1 Number, and 1 Special Character")
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isStrongPassword()
        .bail()
        .trim(),
    check("bio", "Please enter a short bio")
        .not()
        .bail()
        .isEmpty()
        .bail()
        .trim(),
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        bcrypt.hash(req.body.password.trim(), 10, (err, hashedPassword) => {
            let newUser = {
                username: req.body.username.trim(),
                email: req.body.email.trim(),
                password: hashedPassword,
                bio: req.body.bio
            }


            UserService.create(newUser)
                .then((user) => {
                    const token = createToken(user._id)
                    let currentUser = {
                        id: user._id,
                        username: req.body.username.trim(),
                        email: req.body.email.trim(),
                        bio: req.body.bio
                    }
                    res.status(200).json({ currentUser, token })
                }).catch((err) => {
                    res.status(404)
                    res.end()
                })
        })
    }
});



router.post("/login", (req, res, next) => {

    const { username, password } = req.body


    if (!username || !password) {
        return res.status(400).send({ error: "All fields are required" });
    }

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.status(404).send({ error: "Incorrect username" })
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ error: "Server error" });
            }
            if (result) {
                const token = createToken(user._id)
                return res.json({
                    currentUser: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        bio: user.bio
                    }, token
                });

            } else {
                return res.status(400).send({ error: "Incorrect password" })
            }
        });
    });

})



module.exports = router;