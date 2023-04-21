const mongoose = require("mongoose")



const Schema = mongoose.Schema
let postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, minLength: 5, required: true },
    category: { type: String, required: true },
    photo: { type: String },
    post: { type: String, minLength: 5, required: true }
}, { timestamps: true })


module.exports = mongoose.model("Post", postSchema)