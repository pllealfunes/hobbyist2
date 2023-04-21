let mongoose = require("mongoose")

const Schema = mongoose.Schema
let userSchema = new Schema({
    username: { type: String, minLength: 5, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, minLength: 10, required: true },
    categories: [
        String
    ],
    users: [
        String
    ]
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)
