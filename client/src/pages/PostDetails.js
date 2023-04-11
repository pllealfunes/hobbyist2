import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from 'react-toastify';
import axiosPrivate from "../config/interceptor";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../features/auth/authSlice'


// Import other components
import Modal from "../components/DeleteModal"
import FollowCategoryBtn from "../components/FollowCategoryBtn";


const PostDetails = () => {
    let btnId = [1, 2];
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector((state) => state.auth)
    const [post, setPost] = useState([])
    const [author, setAuthor] = useState('')
    const [comments, setComments] = useState([])
    const [errorsServer, setErrorsServer] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [buttonId, setButtonId] = useState('')
    const [message, setMessage] = useState('')


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            comment: ''
        }
    });

    const fetchComments = useCallback(async () => {

        try {
            let response = await axios.get(`http://localhost:5000/api/blog/post/${id}/getComments`)
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }

    }, [id])

    useEffect(() => {

        const fetchPost = async () => {
            try {
                let getPosts = await axios.get(`http://localhost:5000/api/blog/post/${id}`);
                setPost(getPosts.data);
            } catch (error) {
                console.log(error);
                navigate("*")
            }
        }

        fetchPost()
        fetchComments()

    }, [id, fetchComments, navigate])


    useEffect(() => {

        const fetchAuthor = async () => {
            try {
                if (post.user) {
                    let response = await dispatch(getUser(post.user))
                    setAuthor(response.payload)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchAuthor()

    }, [post.user])


    // Function to create a new comment and display new comment by calling fetchComments
    const submitComment = (data) => {
        (async () => {
            try {
                await axiosPrivate.post(`/blog/post/${id}/comment/newComment`, { ...data, user: user.currentUser.id, postid: id })
                console.log("new comment");
                fetchComments()
                toast.success("You added a new comment!")
            } catch (error) {
                if (error.response) setErrorsServer(error.response.data.errors)
                toast.error("Unable to create a new comment")
            }
        })();
        reset()
        if (errorsServer) setErrorsServer('')
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
                    navigate("/profile")
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
        <div className="container">
            <section>
                <h1>{post.title}</h1>
                {user ? <FollowCategoryBtn category={post.category} user={user} /> : <div><div>{post.category}</div> <button onClick={() => (navigate('/login'))}>Follow Category</button></div>}
                <div className="postContainer">
                    {post.photo && <img src={`${process.env.REACT_APP_URL}/public/images/${post.photo}`} alt="" height={500} />}
                    <p>{post.post}</p>
                    <div>
                        <Link to={`/profile/${post.user}`}><button>{author.username}</button></Link>
                    </div>
                </div>
                <Link key={post._id} to={`/post/editPost/${post._id}`}>
                    <button>Edit Post</button>
                </Link>
                <button id="deletePostBtn" onClick={(e) => handleModal(post._id, btnId[0])}>Delete Post</button>
            </section >

            <section className="commSection">
                <h1>Comments</h1>
                <div className="commFormContainer">
                    <form className="commentForm" onSubmit={handleSubmit(submitComment)}>

                        <label htmlFor="commentBox"></label>
                        {errorsServer && errorsServer.map((error) => (
                            <div className="errorMsg" key={error.param}>
                                <div>{error.msg}</div>
                            </div>
                        ))}
                        {errors.comment && <span>Comments must be at least 5 characters long</span>}
                        <textarea
                            id="commentBox"
                            name="comment"
                            placeholder="Comment"
                            rows={10}
                            {...register("comment", { required: true, minLength: 5 })}
                        />
                        <button className="submitCommBtn" type="submit">Submit</button>
                    </form>
                </div>

                <div className="comments">
                    {comments && comments.map((comment) => (
                        <div key={comment._id}>
                            <p>{comment.comment}</p>
                            <Link key={comment._id} to={`/post/comment/editComment/${comment._id}`}>
                                <button>Edit Comment</button>
                            </Link>
                            <button id="deleteCommBtn" onClick={(e) => handleModal(comment._id, btnId[1])}>Delete Comment</button>
                        </div>
                    ))}
                </div>
            </section>

            {showModal && <Modal deleteId={deleteId} deleteFunction={deleteFunction} message={message} />}
        </div >
    );
}

export default PostDetails;