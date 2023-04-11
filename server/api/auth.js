/* LOGIN AND LOGOUT CODE IS A MIX OF CODE FROM TUTORIALS FROM NET NINJA AND DAVE GRAY. VIEW README FOR RESOURCE */

require('dotenv').config()
let cors = require('cors')
let express = require('express')
let router = express.Router()
let bcrypt = require('bcrypt')

/* Import Controllers */
const usersController = require('../controllers/usersController')
const UserService = usersController.UserService
const User = require('../models/userSchema')

/* Validation */
const { check, validationResult } = require('express-validator')

/* Verify JWT */
const verifyJWT = require('../middleware/verifyJWT')

/* CORS */

router.use((req, res, next) => {
    res.set({
        // allow any domain, allow REST methods we've implemented
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
        // Set content-type for all api requests
        'Content-type': 'application/json'
    });
    if (req.method == 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});




// Create JWT Token 
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '5h' })
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
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        bcrypt.hash(req.body.password.trim(), 10, (err, hashedPassword) => {
            let newUser = {
                username: req.body.username.trim(),
                email: req.body.email.trim(),
                password: hashedPassword
            }
            UserService.create(newUser)
                .then((user) => {
                    const token = createToken(user._id)
                    res.status(200).json({ user, token })
                }).catch((err) => {
                    res.status(404)
                    res.end()
                })
        })
    }
});


router.post("/login", async (req, res, next) => {

    const { username, password } = req.body

    try {
        if (!username || !password) {
            return res.status(400).send({ error: "All fields must be filled" })
        }

        const user = await UserService.find({ username: username })


        const currentUser = {
            id: user._id,
            username: user.username,
            email: user.email
        }


        if (!user) {
            return res.status(400).send({ error: "Incorrect username" })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(400).send({ error: "Incorrect password" })

        const token = createToken(user._id)

        // Send accessToken containing username and roles 
        res.json({ currentUser, token })

    } catch (error) {
        return res.status(400).send({ error: "Unable to login" })
    }
})



module.exports = router;