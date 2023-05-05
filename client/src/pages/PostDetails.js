import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios";
import axiosPrivate from "../config/useAxiosPrivate";
import { useSelector } from "react-redux";


// Import other components
import Modal from "../components/DeleteModal"
import FollowCategoryBtn from "../components/FollowCategoryBtn";
import { Author } from "../components/Author";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


import {
    Grid,
    Box,
    Typography

} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PostDetails = () => {

    let btnId = [1, 2];
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector((state) => state.auth)
    const [post, setPost] = useState([])
    const [paragraph, setParagraph] = useState([])
    const [createdAt, setCreatedAt] = useState("")
    const [updatedAt, setUpdatedAt] = useState("")
    const [comments, setComments] = useState([])
    const [errorsServer, setErrorsServer] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [buttonId, setButtonId] = useState('')
    const [message, setMessage] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [characterCount, setCharacterCount] = useState(0)


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            comment: ''
        }
    });

    const fetchComments = useCallback(async () => {

        try {
            let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/${id}/getComments`)
            let newComments = response.data.sort((a, b) => {
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                return dateB - dateA
            })
            newComments.forEach(post => {
                post.createdAt = new Date(post.createdAt).toLocaleString();
            });
            setComments(newComments);
        } catch (error) {
            console.log(error);
        }

    }, [id])

    useEffect(() => {

        const fetchPost = async () => {
            try {
                let getPosts = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/${id}`);
                setPost(getPosts.data);
                let data = getPosts.data
                if (data.post.includes('\n')) {
                    setParagraph(data.post.split('\n'));
                } else {
                    setParagraph([data.post]);
                }
                setCreatedAt(new Date(data.createdAt).toLocaleString())
                setUpdatedAt(new Date(data.createdAt).toLocaleString())

            } catch (error) {
                console.log(error);
                navigate("*")
            }
        }

        fetchPost()
        fetchComments()

    }, [id, fetchComments, navigate, user])

    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setCharacterCount(inputText.length);
        if (inputText.length < 5) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    };

    // Function to create a new comment and display new comment by calling fetchComments
    const submitComment = (data) => {
        (async () => {
            try {
                await axiosPrivate.post(`/blog/post/${id}/comment/newComment`, { ...data, user: user.currentUser.id })
                fetchComments()
                toast.success("You added a new comment!")
                reset()
            } catch (error) {
                toast.error("Unable to create a new comment")
            }
        })();
    }


    // Function to show Modal and set the item to be deleted (comment or post) and their corresponding function
    const handleModal = (itemId, btn) => {
        setShowModal(true)
        setDeleteId(itemId)
        setButtonId(btn)
        if (btn === 1) {
            setMessage("Do you want to delete this post? If you do you will be redirected to your profile.")
        } else {
            setMessage("Do you want to delete this comment?")
        }
    }


    // Based on button id, call the following function to delete either a post or comment
    // and passs the deleteId and choice of user to the function
    const deleteFunction = (deleteId, choice) => {
        if (buttonId === 1) {
            deletePost(deleteId, choice)
        } else {
            deleteComment(deleteId, choice)
        }

    }


    // Function to delete a post
    const deletePost = (postId, choice) => {
        if (choice) {
            (async () => {
                try {
                    await axiosPrivate.delete(`/blog/post/deletePost/${postId}`);
                    toast.success('Deleted Post')
                    navigate(`/profile/${user.currentUser.id}`)
                } catch (error) {
                    toast.success('Unable to Delete Post')
                    if (error.response) setErrorsServer(error.response.data.errors)
                    toast.error("Unable to delete post")
                }
            })();
            if (errorsServer) setErrorsServer('')
        }
        else {
            setShowModal(false)
        }
    }

    // Function to delete a comment
    const deleteComment = (commentId, choice) => {
        if (choice) {
            (async () => {
                try {
                    await axiosPrivate.delete(`/blog/post/comment/deleteComment/${commentId}`);
                    fetchComments()
                    setShowModal(false)
                    toast.success("Your comment was deleted")
                } catch (error) {
                    if (error.response) setErrorsServer(error.response.data.errors)
                    toast.error("Unable to delete comment")
                }
            })();
            if (errorsServer) setErrorsServer('')
        }
        else {
            setShowModal(false)
        }
    }


    return (
        <section className="postsdetailsSection">
            <Box
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        '& button': { my: 3 }
                    }}
                    width={900}
                >

                    {showModal && <Modal deleteId={deleteId} deleteFunction={deleteFunction} message={message} />}
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        className="postInfo"
                    >

                        <Typography variant="h4">{post.title}</Typography>
                        <div className="postDetails">
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <p>By:</p> {post.user && <Author userId={post.user} />}
                            </Grid>
                            {user ? <FollowCategoryBtn category={post.category} user={user} /> : <div>Category: {post.category}</div>}
                        </div>

                        {user && user.currentUser.id === `${post.user}` ?
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <p>Created: {createdAt}</p>
                                <div>
                                    <button className="deletePostBtn" onClick={(e) => handleModal(post._id, btnId[0])}>Delete Post</button>
                                    <button className="editPostBtn"><Link className="editPostLink" key={post._id} to={`/post/editPost/${post._id}`}>Edit Post</Link></button>
                                </div>
                                <p>Updated: {updatedAt}</p>
                            </Grid>
                            :
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <p>Created: {createdAt}</p>
                                <p>Updated: {updatedAt}</p>
                            </Grid>
                        }
                    </Grid>
                    <Box sx={{ p: 3 }} width={800}>
                        {post.photo && <img className="postPhoto" src={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`} alt="" />}
                        <div className="contentContainer">
                            {paragraph.map((paragraph, index) => (
                                <p className="postContent" key={index}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </Box>
                </Grid>
            </Box>

            <div className="commSection">
                <Typography variant="h5" sx={{ mx: 3, my: 5 }}>Comments</Typography>
                <div className="commFormContainer">
                    <form className="commentForm" onSubmit={handleSubmit(submitComment)}>

                        <label htmlFor="commentBox"></label>
                        {errors.comment && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Comments must be at least 5 characters long</span></Alert>}
                        <Typography variant="caption">* 5 Minimum Characters</Typography>
                        <textarea
                            id="commentBox"
                            className="commentBox"
                            name="comment"
                            placeholder="Comment"
                            rows={10}
                            {...register("comment", { required: true, minLength: 5 })}
                            onChange={handleTextChange}
                        />
                        <p>Character count: {characterCount}</p>
                        {user ?
                            <button className="submitCommBtn" type="submit" disabled={isButtonDisabled}>Submit</button> :
                            <button className="commBtn" type="submit"><Link to={"/login"}>Login to Comment</Link></button>
                        }
                    </form>
                </div>

                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    className="commentsContainer"
                >
                    {comments && comments.map((comment) => (
                        <div className="comment" key={comment._id}>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-start"
                                sx={{ my: 1 }}
                            >
                                <AccountCircleIcon aria-label="user profile photo" sx={{ height: 30, width: 30 }} />
                                {comment.user && <Author userId={comment.user} />}
                            </Grid>
                            <Typography variant="body1">{comment.comment}</Typography>
                            {user && user.currentUser.id === `${comment.user}` ?
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    className="commBtnsContainer"
                                >
                                    <Typography variant="caption">Created: {createdAt}</Typography>
                                    <button className="editCommBtn">
                                        <Link className="editCommLink" key={comment._id} to={`/post/comment/editComment/${comment._id}`}>Edit</Link></button>
                                    <button className="deleteCommBtn" onClick={(e) => handleModal(comment._id, btnId[1])}>Delete</button>
                                </Grid>
                                :
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    className="commBtnsContainer">
                                    <Typography variant="caption">Created: {createdAt}</Typography>
                                </Grid>
                            }
                        </div>
                    ))}
                </Grid>
            </div>
        </section >
    );
}

export default PostDetails;