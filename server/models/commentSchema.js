const mongoose = require("mongoose")



const Schema = mongoose.Schema
let commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, minLength: 5, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true })


module.exports = mongoose.model("Comment", commentSchema)