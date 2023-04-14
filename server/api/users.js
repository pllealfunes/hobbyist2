require('dotenv').config()
let cors = require('cors')
let express = require('express')
let router = express.Router()

const User = require('../models/userSchema')

/* Import Controllers */
const usersController = require('../controllers/usersController')
const UserService = usersController.UserService

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



/* Get all users */
router.get('/users', (req, res, next) => {
    UserService.list()
        .then((users) => {
            res.status(200)
            res.json(users)
        })
})


router.get('/user/:id', (req, res, next) => {
    UserService.find({ _id: req.params.id })
        .then((user) => {
            let getUser = {
                "id": user._id,
                "username": user.username,
                "email": user.email,
                "bio": user.bio,
                "categories": user.categories,
                "users": user.users
            }
            res.status(200)
            res.json(getUser)
        })
})



/* Code associated with following categories */
router.put('/:id/followCategory/:category', verifyJWT, (req, res, next) => {

    User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { categories: req.params.category } })
        .then((updateCategory) => {
            res.status(200)
            res.json(updateCategory)
        }).catch((err) => {
            res.status(404).send({ message: "Cannot unfollow category" })
            res.end()
        });

})


/* Code associated with unfollowing categories */
router.put('/:id/unFollowCategory/:category', verifyJWT, (req, res, next) => {

    User.findOneAndUpdate({ _id: req.params.id }, { $pull: { categories: req.params.category } })
        .then((updateCategory) => {
            res.status(200)
            res.json(updateCategory)
        }).catch((error) => {
            res.status(404).send({ message: "Cannot unfollow category" })
            res.end()
        });

})

/* Code associated with following a user */
router.put('/:userid/followUser/:id', verifyJWT, async (req, res, next) => {

    User.findOneAndUpdate({ _id: req.params.userid }, { $addToSet: { users: req.params.id } })
        .then((updateCategory) => {
            res.status(200)
            res.json(updateCategory)
        }).catch((error) => {
            res.status(404).send({ message: "Cannot unfollow user" })
            res.end()
        });

})

/* Code associated with unfollowing users */
router.put('/:userid/unFollowUser/:id', verifyJWT, async (req, res, next) => {

    User.findOneAndUpdate({ _id: req.params.userid }, { $pull: { users: req.params.id } })
        .then((updateCategory) => {
            res.status(200)
            res.json(updateCategory)
        }).catch((error) => {
            res.status(404).send({ message: "Cannot unfollow user" })
            res.end()
        });

})

// error
router.use(function (err, req, res, next) {
    console.error(err)
    res.status(500)
    res.end()
});


// export our router
module.exports = router