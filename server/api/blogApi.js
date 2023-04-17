require('dotenv').config()
const fs = require("fs");
const path = require("path");
let cors = require('cors')
let express = require('express')
let router = express.Router()
const Post = require('../models/postSchema')
const formidable = require("formidable");

/* Import Controllers */
const postsController = require('../controllers/postsController')
const PostService = postsController.PostService
const commentsController = require('../controllers/commentsController')
const CommentService = commentsController.CommentService


/* Multer for Photos */
const multer = require('multer');
const upload = multer({
    storage: postsController.storage,
    fileFilter: postsController.imageFilter,
    limits: { fileSize: 90 * 1024 * 1024 }
});


/* Validation */
const { check, validationResult } = require('express-validator')


/* Verify JWT */
const verifyJWT = require('../middleware/verifyJWT');



/* CORS */

const corsOptions = {
    origin: `${process.env.FRONTEND}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}
router.use(cors(corsOptions))


/* Start of Routing */

const validationMiddleware = [
    check('title', 'A title is required and must be at least 5 characters long')
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isLength({ min: 5 })
        .bail()
        .trim(),
    check('category', 'A category is required').not().bail().isEmpty().bail(),
    check('post', 'A post is required and must be at least 5 characters long')
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isLength({ min: 5 })
        .bail()
        .trim(),
];

/* Code associated with blog posts */

// list
router.get('/posts', (req, res, next) => {
    PostService.list()
        .then((posts) => {
            res.status(200)
            res.json(posts)
        }).catch((err) => {
            res.status(404)
            res.end()
        });
})

// Find Posts by User
router.get('/post/user/:userid', (req, res, next) => {
    Post.find({ user: req.params.userid })
        .then((posts) => {
            res.status(200);
            res.json(posts);
        }).catch((err) => {
            res.status(404)
            res.end()
        });
})

// Find Posts
router.get('/post/:postid', (req, res, next) => {
    PostService.find(req.params.postid)
        .then((post) => {
            res.status(200);
            res.json(post);
        }).catch((err) => {
            res.status(404);
            res.end();
        })
})



// Create Posts
router.post('/post/newPost', verifyJWT, validationMiddleware, (req, res, next) => {
    const form = formidable({ multiples: true });
    form.uploadDir = path.join(__dirname, "../public/images");
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const errors = validationResult(fields);

        if (!errors.isEmpty()) {
            // If there are errors, delete any uploaded files
            if (files.photo) {
                fs.unlink(files.photo.filepath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            return res.status(400).json({ errors: errors.array() });


        } else {

            const photoName = files.photo ? files.photo.originalFilename : null;
            if (photoName && !/\.(jpg|jpeg|png|gif)$/i.test(photoName)) {
                fs.unlink(files.photo.filepath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                return res.status(400).json({ errors: [{ msg: 'Invalid photo format' }] });
            }

            if (photoName) {
                const post = {
                    user: fields.user,
                    title: fields.title,
                    category: fields.category,
                    post: fields.post,
                    photo: files.photo.originalFilename,
                };
                console.log(files.photo.filepath)
                console.log("PATH" + files.photo.path)
                console.log(post)

                PostService.create(post)
                    .then((post) => {
                        console.log(post)
                        path.join(__dirname, "../public/images/posts", files.photo.originalFilename);
                        const oldPath = files.photo.filepath;
                        const newPath = path.join(__dirname, "../public/images/posts", files.photo.originalFilename);
                        fs.rename(oldPath, newPath, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                        res.status(201).json(post);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                const post = {
                    user: fields.user,
                    title: fields.title,
                    category: fields.category,
                    post: fields.post
                };

                PostService.create(post)
                    .then((post) => {
                        console.log(post)
                        res.status(201).json(post);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    });
});


// Update Posts
router.put('/post/editPost/:postid', verifyJWT, validationMiddleware,
    (req, res, next) => {

        const form = formidable({ multiples: true });
        form.uploadDir = path.join(__dirname, "../public/images");
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const errors = validationResult(fields);

            if (!errors.isEmpty()) {
                // If there are errors, delete any uploaded files
                if (files.photo) {
                    fs.unlink(files.photo.filepath, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
                return res.status(400).json({ errors: errors.array() });


            } else {

                const photoName = files.photo ? files.photo.originalFilename : null;
                if (photoName && !/\.(jpg|jpeg|png|gif)$/i.test(photoName)) {
                    fs.unlink(files.photo.filepath, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    return res.status(400).json({ errors: [{ msg: 'Invalid photo format' }] });
                }


                if (photoName && !fs.existsSync(files.photo.originalFilename)) {
                    const post = {
                        user: fields.user,
                        title: fields.title,
                        category: fields.category,
                        post: fields.post,
                        photo: files.photo.originalFilename,
                    };


                    PostService.update(req.params.postid, post)
                        .then((post) => {
                            console.log(post)
                            path.join(__dirname, "../public/images", files.photo.originalFilename);
                            const oldPath = files.photo.filepath;
                            const newPath = path.join(__dirname, "../public/images", files.photo.originalFilename);
                            fs.rename(oldPath, newPath, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                            res.status(201).json(post);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                } else {
                    const post = {
                        user: fields.user,
                        title: fields.title,
                        category: fields.category,
                        post: fields.post
                    };

                    PostService.update(req.params.postid, post)
                        .then((post) => {
                            res.status(200);
                            res.json(post);
                        }).catch((err) => {
                            res.status(404);
                            res.end();
                        });

                }
            }
        });
    });


// Delete Photo from Edit Form

router.put('/post/editPost/deletePhoto/:postid', verifyJWT, (req, res, next) => {

    if (req.body) {
        // If there are errors, delete any uploaded files
        if (req.body.photo) {
            fs.unlink("./public/images/posts" + req.body.photo, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

    }

    const post = {
        photo: null
    }

    PostService.update(req.params.postid, post)
        .then((removePhoto) => {
            res.status(200);
            res.json(removePhoto);
        }).catch((err) => {
            res.status(404);
            res.end();
        });

});



//  Delete Posts with their Comments
router.delete('/post/deletePost/:postid', verifyJWT, (req, res) => {
    CommentService.deleteAll(req.params.postid)
        .then((comment) => {
            res.status(200)
            res.send(comment)
        }).catch((err) => {
            res.status(404)
            res.end()
        });


    PostService.find(req.params.postid)
        .then((post) => {
            if (post.photo) {
                fs.unlink("./public/images/" + post.photo, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            res.status(200);
            res.json(post);
        }).catch((err) => {
            res.status(404);
            res.end();
        })


    PostService.delete(req.params.postid)
        .then((post) => {
            res.status(200)
            res.send(post)
        }).catch((err) => {
            res.status(404)
            res.end()
        });
});








/* Code associated with blog comments */

// List Comments
router.get('/post/:postid/getComments', (req, res, next) => {
    CommentService.list(req.params.postid)
        .then((comment) => {
            res.status(200)
            console.log(comment)
            res.json(comment)
        }).catch((err) => {
            res.status(404)
            res.end()
        });
});

// Find Comment
router.get('/post/comment/:commentid', (req, res, next) => {
    CommentService.find(req.params.commentid)
        .then((comment) => {
            res.status(200)
            res.json(comment)
        }).catch((err) => {
            res.status(404)
            res.end()
        });
});



// Create Comment
router.post('/post/:postid/comment/newComment', verifyJWT, [
    check("comment", "A comment must be at least 5 characters long")
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isLength({ min: 5 })
        .bail()
        .trim(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        const comment = {
            user: req.user,
            comment: req.body.comment,
            postId: req.params.postid
        };

        CommentService.create(comment)
            .then((comment) => {
                res.status(200)
                res.json(comment)
            }).catch((err) => {
                res.status(404)
                res.end()
            });
    }

});

// Update Comment
router.put('/post/comment/editComment/:commentid', verifyJWT, [
    check("comment", "A comment must be at least 5 characters long")
        .not()
        .bail()
        .isEmpty()
        .bail()
        .isLength({ min: 5 })
        .bail()
        .trim(),
], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        const comment = req.body
        CommentService.update(req.params.commentid, comment)
            .then((updateComment) => {
                res.status(200)
                res.json(updateComment)
            }).catch((err) => {
                res.status(404)
                res.end()
            });
    }
});


//  Delete Comment
router.delete('/post/comment/deleteComment/:commentid', verifyJWT, (req, res, next) => {
    CommentService.delete(req.params.commentid)
        .then((comment) => {
            res.status(200)
            res.send(comment)
        }).catch((err) => {
            res.status(404)
            res.end()
        });
});



// error
router.use(function (err, req, res, next) {
    console.error(err)
    res.status(500)
    res.end()
});


// export our router
module.exports = router