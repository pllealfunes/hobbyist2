const Comment = require('../models/commentSchema')


class CommentService {
    //  list
    static list(id) {
        return Comment.find({ postId: id })
            .then((comments) => {
                return comments;
            })
    }
    //  findOne
    static find(id) {
        return Comment.findById(id)
            .then((comment) => {
                return comment;
            })
    }
    //  create
    static create(obj) {
        let comment = new Comment(obj)
        return comment.save()
    }

    //  update
    static update(id, data) {
        return Comment.findById(id)
            .then((comment) => {
                comment.set(data)
                comment.save()
                return comment
            })
    }

    //  delete
    static delete(id) {
        return Comment.deleteOne({ _id: id })
            .then((obj) => {
                return obj
            })
    }

    //  delete
    static deleteAll(id) {
        return Comment.deleteMany({ postId: id })
            .then((obj) => {
                return obj
            })
    }
}


module.exports.CommentService = CommentService