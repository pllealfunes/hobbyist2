const mongoose = require("mongoose")
let moment = require('moment')


const Schema = mongoose.Schema
let commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, minLength: 5, required: true },
    timestamp: { type: String, default: () => moment().format("MMMM Do YYYY, h:mm:ss a") },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
})


module.exports = mongoose.model("Comment", commentSchema)