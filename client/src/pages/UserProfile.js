import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import axios from "axios"
import { toast } from 'react-toastify'
import axiosPrivate from '../config/useAxiosPrivate';
import Pagination from '../components/Pagination';
import { Author } from '../components/Author';
import EmptyProfile from "../components/EmptyProfile";


import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box

} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const { singleUser } = useSelector((state) => state.auth)
    const { id } = useParams()
    const [userProfile, setUserProfile] = useState('')
    const [isFollow, setIsFollow] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [currentPosts, setCurrentPosts] = useState('')
    const [currentUser, setCurrentUser] = useState('')

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        (async () => {
            try {

                let userProfile = await dispatch(getUser(id))
                setUserProfile(userProfile.payload)
                if (id && user) {
                    let currentUser = await dispatch(getUser(user.currentUser.id))
                    setCurrentUser(currentUser.payload)
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [id, dispatch, user])


    useEffect(() => {
        (async () => {
            try {
                if (currentUser) {
                    if (currentUser.users.includes(id)) {
                        setIsFollow(true)
                    } else {
                        setIsFollow(false)
                    }
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [currentUser, isFollow, id])

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/user/${id}`)
                let posts = response.data.reverse()
                setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))

            } catch (error) {
                console.log(error);
            }

        })();

    }, [indexOfFirstPost, indexOfLastPost, id])




    const followUser = async () => {
        try {
            if (user.currentUser.id === id) {
                toast.error('You cannot follow yourself')
            } else {

                await axiosPrivate.put(`/users/${user.currentUser.id}/followUser/${id}`)
                toast.success(`Following ${userProfile.username}`)
                setIsFollow(true)

            }

        } catch (error) {
            toast.error("Try again later")
        }

    }


    const unfollowUser = async () => {
        try {
            if (user.currentUser.id === id) {
                toast.error('You cannot unfollow yourself')
            } else {

                await axiosPrivate.put(`/users/${user.currentUser.id}/unFollowUser/${id}`)
                toast.success(`Unfollowing ${userProfile.username}`)
                setIsFollow(false)

            }

        } catch (error) {

            toast.error("Try again later")
        }

    }




    return (
        <section className="profileWrapper">
            {user ?

                user.currentUser.id !== id ?
                    <div>
                        <Box
                            display="flex"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            className="searchWrapper"
                        >
                            <Grid
                                container
                                className="searchContainer"
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    boxShadow: 2,
                                    '& button': { my: 3 },
                                }}
                                width={700}
                            >
                                <AccountCircleIcon aria-label="user profile photo" sx={{ height: 100, width: 100 }} />
                                <h2>{userProfile.username}</h2>
                                <p>{userProfile.bio}</p>
                                <div>
                                    {userProfile.users?.length > 0 ? <p>Following: {userProfile.users.length}</p> : <p>Following: 0</p>}
                                    {userProfile.categories?.length > 0 ? <p>Categories: {userProfile.categories.length}</p> : <p>Categories: 0</p>}
                                </div>
                                <button
                                    className="followBtn"
                                    onClick={() => {
                                        if (isFollow) {
                                            unfollowUser();
                                        } else {
                                            followUser();
                                        }
                                    }}
                                >
                                    {isFollow ? "Unfollow" : "Follow"}
                                </button>
                            </Grid>
                        </Box>
                        <section className='postsWrapper'>
                            {currentPosts && currentPosts.map((post) => (
                                <div className="postCard" key={post._id} >
                                    {post.photo &&
                                        <Card
                                            className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                            <div>
                                                <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`}>
                                                    <CardMedia component="div" sx={{ height: 140 }} image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`} />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>
                                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                                            {post.post.split("", 100)}
                                                        </Typography>
                                                    </CardContent>
                                                </Link>
                                            </div>
                                            <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary">
                                                    {post.timestamp}
                                                </Typography>
                                            </Grid>
                                        </Card>

                                    }

                                    {!post.photo &&
                                        <Card className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                            <div>
                                                <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`}>

                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>
                                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                                            {post.post.split(".", 6)}
                                                        </Typography>
                                                    </CardContent>
                                                </Link>
                                            </div>
                                            <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                    {post.timestamp.split(",", 1)}
                                                </Typography>
                                            </Grid>
                                        </Card>
                                    }
                                </div>
                            ))}
                        </section>
                    </div>

                    :

                    <div>
                        <Box
                            display="flex"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            className="searchWrapper"
                        >
                            <Grid
                                container
                                className="searchContainer"
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    boxShadow: 2,
                                    '& button': { my: 3 },
                                }}
                                width={700}
                            >
                                <AccountCircleIcon aria-label="user profile photo" sx={{ height: 100, width: 100 }} />
                                <h2>{userProfile.username}</h2>
                                <p>{userProfile.bio}</p>

                                <div>
                                    {userProfile.users?.length > 0 ? <p>Following: {userProfile.users.length}</p> : <p>Following: 0</p>}
                                    {userProfile.categories?.length > 0 ? <p>Categories: {userProfile.categories.length}</p> : <p>Categories: 0</p>}
                                </div>
                                <Link to={`/editProfile/${userProfile.id}`}><button className="followBtn">Edit Profile</button></Link>
                            </Grid>
                        </Box>
                        <section className='postsWrapper'>

                            {currentPosts && currentPosts.map((post) => (
                                <div className="postCard" key={post._id} >
                                    {post.photo &&
                                        <Card
                                            className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                            <div>
                                                <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`}>
                                                    <CardMedia component="div" sx={{ height: 140 }} image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`} />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>
                                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                                            {post.post.split("", 100)}
                                                        </Typography>
                                                    </CardContent>
                                                </Link>
                                            </div>
                                            <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary">
                                                    {post.timestamp}
                                                </Typography>
                                            </Grid>
                                        </Card>

                                    }

                                    {!post.photo &&
                                        <Card className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                            <div>
                                                <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}s
                                                </Grid>
                                                <Link to={`/post/${post._id}`}>

                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>
                                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                                            {post.post.split(".", 6)}
                                                        </Typography>
                                                    </CardContent>
                                                </Link>
                                            </div>
                                            <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                    {post.timestamp.split(",", 1)}
                                                </Typography>
                                            </Grid>
                                        </Card>
                                    }
                                </div>
                            ))}
                        </section>
                    </div>


                :
                <div>
                    <Box
                        display="flex"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        className="searchWrapper"
                    >
                        <Grid
                            container
                            className="searchContainer"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                boxShadow: 2,
                                '& button': { my: 3 },
                            }}
                            width={700}
                        >
                            <AccountCircleIcon aria-label="user profile photo" sx={{ height: 100, width: 100 }} />
                            <h2>{userProfile.username}</h2>
                            <p>{userProfile.bio}</p>
                            <div>
                                {userProfile.users?.length > 0 ? <p>Following: {userProfile.users.length}</p> : <p>Following: 0</p>}
                                {userProfile.categories?.length > 0 ? <p>Categories: {userProfile.categories.length}</p> : <p>Categories: 0</p>}
                            </div>
                            <button className="followBtn" onClick={() => (navigate('/login'))}>Follow User</button>
                        </Grid>
                    </Box>
                    <section className='postsWrapper'>
                        {currentPosts && currentPosts.map((post) => (
                            <div className="postCard" key={post._id} >
                                {post.photo &&
                                    <Card
                                        className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                        <div>
                                            <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                                <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                {post.user && <Author userId={post.user} />}
                                            </Grid>
                                            <Link to={`/post/${post._id}`}>
                                                <CardMedia component="div" sx={{ height: 140 }} image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`} />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {post.title}
                                                    </Typography>
                                                    <Typography className="textPreview" variant="body2" color="text.secondary">
                                                        {post.post.split("", 100)}
                                                    </Typography>
                                                </CardContent>
                                            </Link>
                                        </div>
                                        <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                            <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                {post.category}
                                            </Typography>
                                            <Typography variant="caption" color="text.primary">
                                                {post.timestamp}
                                            </Typography>
                                        </Grid>
                                    </Card>

                                }

                                {!post.photo &&
                                    <Card className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                        <div>
                                            <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                                <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                {post.user && <Author userId={post.user} />}
                                            </Grid>
                                            <Link to={`/post/${post._id}`}>

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {post.title}
                                                    </Typography>
                                                    <Typography className="textPreview" variant="body2" color="text.secondary">
                                                        {post.post.split("", 300)}
                                                    </Typography>
                                                </CardContent>
                                            </Link>
                                        </div>
                                        <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                            <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                {post.category}
                                            </Typography>
                                            <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                {post.timestamp.split(",", 1)}
                                            </Typography>
                                        </Grid>
                                    </Card>
                                }
                            </div>

                        ))}
                    </section>
                </div>

            }
            {currentPosts && <Pagination
                className="paginationBar"
                postsPerPage={postsPerPage}
                totalPosts={currentPosts.length}
                paginate={paginate}
            />}
        </section >

    )
}

export default UserProfile