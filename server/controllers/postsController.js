const Post = require('../models/postSchema')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const imageFilter = function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    } else {
        cb(new Error("OnlyImageFilesAllowed"), false);
    }
}

class PostService {
    //  list
    static list() {
        return Post.find({})
            .then((posts) => {
                return posts
            })
    }
    //  find
    static find(id) {
        return Post.findById(id)
            .then((post) => {
                return post
            })
    }
    //  create
    static create(obj) {
        let post = new Post(obj)
        return post.save()
    }

    //  update
    static update(id, data) {
        return Post.findById(id)
            .then((post) => {
                post.set(data)
                post.save()
                return post
            })
    }

    //  delete
    static delete(id) {
        return Post.deleteOne({ _id: id })
            .then((obj) => {
                return obj
            })
    }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.PostService = PostService;