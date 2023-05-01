/* Import Controllers */
const User = require("../models/userSchema")

const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization || req.headers.Authorization


    if (authHeader?.startsWith('Bearer ')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            console.log("Not authorized")
            return res.status(401).send({ error: "Not Authorized" })
        }
    }

    if (!token) {
        console.log("Not authorized, no token")
        return res.status(401).send({ error: "Not authorized, no token" })
    }
}

module.exports = verifyJWT