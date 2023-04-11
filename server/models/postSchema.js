const mongoose = require("mongoose")
let moment = require('moment')


const Schema = mongoose.Schema
let postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, minLength: 5, required: true },
    category: { type: String, required: true },
    photo: { type: String },
    post: { type: String, minLength: 5, required: true },
    timestamp: { type: String, default: () => moment().format("MMMM Do YYYY, h:mm:ss a") }
})


module.exports = mongoose.model("Post", postSchema)