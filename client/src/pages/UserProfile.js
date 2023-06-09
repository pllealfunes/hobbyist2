import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import axios from "axios"
import Pagination from '../components/Pagination';
import { Author } from '../components/Author';
import EmptyProfile from "../components/EmptyProfile";
import FollowUserBtn from '../components/FollowUserBtn'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box,
    Divider

} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const { id } = useParams()
    const [userProfile, setUserProfile] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [currentPosts, setCurrentPosts] = useState([])
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
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/user/${id}`)
                setPosts(response.data)
                let results = response.data
                let newFeed = results.sort((a, b) => {
                    const dateA = new Date(a.createdAt)
                    const dateB = new Date(b.createdAt)
                    return dateB - dateA
                })
                newFeed.forEach(post => {
                    post.createdAt = new Date(post.createdAt).toLocaleString();
                });
                setCurrentPosts(newFeed.slice(indexOfFirstPost, indexOfLastPost))

            } catch (error) {
                console.log(error);
            }

        })();

    }, [indexOfFirstPost, indexOfLastPost, id])








    return (
        <section className="profileSection">

            {user ?

                user.currentUser.id !== id ?
                    <div>
                        <Box
                            display="flex"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            className="profileWrapper"
                        >
                            <Grid
                                container
                                className="profileContainer"
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    boxShadow: 2,
                                    '& button': { my: 3 },
                                }}

                            >
                                <div className='profileBio'>
                                    <AccountCircleIcon aria-label="user profile photo" sx={{ height: 100, width: 100 }} />
                                    <h2>{userProfile.username}</h2>
                                    <p>{userProfile.bio}</p>
                                </div>
                                <Grid
                                    container
                                    className="followContainer"
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-evenly"
                                >
                                    {userProfile.users?.length > 0 ? <p>Following: {userProfile.users.length}</p> : <p>Following: 0</p>}
                                    {userProfile.categories?.length > 0 ? <p>Categories: {userProfile.categories.length}</p> : <p>Categories: 0</p>}
                                </Grid>
                                <FollowUserBtn currentUser={currentUser} id={id} user={user} userProfile={userProfile} />
                            </Grid>
                        </Box>
                        {currentPosts.length > 0 ? <section className='profilepostsWrapper'>
                            {currentPosts && currentPosts.map((post) => (
                                <div className="postCard" key={post._id} >
                                    {post.photo ?
                                        <Card
                                            className='postCard'
                                            sx={{
                                                maxHeight: 400,
                                                maxWidth: 300,
                                                minHeight: 400,
                                                minWidth: 300,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                            elevation={5}>
                                            <div>
                                                <Grid
                                                    container
                                                    flexDirection="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    sx={{ p: 1 }}
                                                    className="postHeader">
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`} className='cardLink'>
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
                                            <Grid
                                                container
                                                flexDirection="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: .5 }}
                                                className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                    {post.createdAt}
                                                </Typography>
                                            </Grid>
                                        </Card>

                                        :
                                        <Card
                                            className='postCard'
                                            sx={{
                                                maxHeight: 400,
                                                maxWidth: 300,
                                                minHeight: 400,
                                                minWidth: 300,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                            elevation={5}>
                                            <div>
                                                <Grid
                                                    container
                                                    flexDirection="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    sx={{ p: 1 }}
                                                    className="postHeader"
                                                >
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`} className='cardLink'>

                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>

                                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                                            {post.post.split("", 400)}
                                                        </Typography>
                                                    </CardContent>
                                                </Link>
                                            </div>
                                            <Grid
                                                container
                                                flexDirection="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ py: .5 }}
                                                className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                    {post.createdAt}
                                                </Typography>
                                            </Grid>
                                        </Card>
                                    }
                                </div>
                            ))}
                        </section> :

                            <EmptyProfile userProfile={userProfile} />
                        }
                    </div>

                    :

                    <div>
                        <Box
                            display="flex"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            className="profileWrapper"
                        >
                            <Grid
                                container
                                className="profileContainer"
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    boxShadow: 2,
                                    '& button': { my: 3 },
                                }}


                            >
                                <div className='profileBio'>
                                    <AccountCircleIcon aria-label="user profile photo" sx={{ height: 100, width: 100 }} />
                                    <h2>{userProfile.username}</h2>
                                    <p>{userProfile.bio}</p>
                                </div>
                                <Grid
                                    container
                                    className="followContainer"
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-evenly"
                                >
                                    {userProfile.users?.length > 0 ? <p>Following: {userProfile.users.length}</p> : <p>Following: 0</p>}
                                    {userProfile.categories?.length > 0 ? <p>Categories: {userProfile.categories.length}</p> : <p>Categories: 0</p>}
                                </Grid>
                            </Grid>
                        </Box>

                        {currentPosts.length > 0 ? <section className='profilepostsWrapper'>

                            {currentPosts && currentPosts.map((post) => (
                                <div className="postCard" key={post._id} >
                                    {post.photo ?
                                        <Card
                                            className='postCard'
                                            sx={{
                                                maxHeight: 400,
                                                maxWidth: 300,
                                                minHeight: 400,
                                                minWidth: 300,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                            elevation={5}>
                                            <div>
                                                <Grid
                                                    container
                                                    flexDirection="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    sx={{ p: 1 }}
                                                    className="postHeader"
                                                >
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`} className='cardLink'>
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
                                                <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                    {post.createdAt}
                                                </Typography>
                                            </Grid>
                                        </Card>


                                        :
                                        <Card
                                            className='postCard'
                                            sx={{
                                                maxHeight: 400,
                                                maxWidth: 300,
                                                minHeight: 400,
                                                minWidth: 300,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                            elevation={5}>
                                            <div>
                                                <Grid
                                                    container
                                                    flexDirection="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    sx={{ p: 1 }}
                                                    className="postHeader"
                                                >
                                                    <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                    {post.user && <Author userId={post.user} />}
                                                </Grid>
                                                <Link to={`/post/${post._id}`} className='cardLink'>

                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {post.title}
                                                        </Typography>

                                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                                            {post.post.split("", 400)}
                                                        </Typography>
                                                    </CardContent>
                                                </Link>
                                            </div>
                                            <Grid container flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ py: .5 }} className="postFooter">
                                                <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                    {post.category}
                                                </Typography>
                                                <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                    {post.createdAt}
                                                </Typography>
                                            </Grid>
                                        </Card>
                                    }
                                </div>
                            ))}
                        </section> :
                            <section className='emptyPostsWrapper'>
                                <Grid
                                    container
                                    className="emptyPostsContainer"
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        boxShadow: 2,
                                        '& button': { my: 3 },
                                    }}
                                    width={700}
                                >
                                    <Typography variant="h5">Welcome to your Profile!</Typography>
                                    <Typography variant="subtitle1">Create a New Post To See it Here</Typography>
                                </Grid>
                            </section>}
                    </div>


                :
                <div>
                    <Box
                        display="flex"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        className="profileWrapper"
                    >
                        <Grid
                            container
                            className="profileContainer"
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                boxShadow: 2,
                                '& button': { my: 3 },
                            }}


                        >
                            <div className='profileBio'>
                                <AccountCircleIcon aria-label="user profile photo" sx={{ height: 100, width: 100 }} />
                                <h2>{userProfile.username}</h2>
                                <p>{userProfile.bio}</p>
                            </div>
                            <Grid
                                container
                                className="followContainer"
                                direction="row"
                                alignItems="center"
                                justifyContent="space-evenly"
                            >
                                {userProfile.users?.length > 0 ? <p>Following: {userProfile.users.length}</p> : <p>Following: 0</p>}
                                {userProfile.categories?.length > 0 ? <p>Categories: {userProfile.categories.length}</p> : <p>Categories: 0</p>}
                            </Grid>
                            <button className="followBtn" onClick={() => (navigate('/login'))}>Follow User</button>
                        </Grid>
                    </Box>
                    {currentPosts.length > 0 ? <section className='profilepostsWrapper'>
                        {currentPosts && currentPosts.map((post) => (
                            <div className="postCard" key={post._id} >
                                {post.photo ?
                                    <Card
                                        className='postCard'
                                        sx={{
                                            maxHeight: 400,
                                            maxWidth: 300,
                                            minHeight: 400,
                                            minWidth: 300,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between"
                                        }}
                                        elevation={5}>
                                        <div>
                                            <Grid
                                                container
                                                flexDirection="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                sx={{ p: 1 }}
                                                className="postHeader"
                                            >
                                                <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                {post.user && <Author userId={post.user} />}
                                            </Grid>
                                            <Link to={`/post/${post._id}`} className='cardLink'>
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
                                        <Grid
                                            container
                                            flexDirection="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ py: .5 }}
                                            className="postFooter">
                                            <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                {post.category}
                                            </Typography>
                                            <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                {post.createdAt}
                                            </Typography>
                                        </Grid>
                                    </Card>

                                    :
                                    <Card className='postCard' sx={{ width: 300, height: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                                        <div>
                                            <Grid
                                                container
                                                flexDirection="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                sx={{ p: 1 }}
                                                className="postHeader">
                                                <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                                {post.user && <Author userId={post.user} />}
                                            </Grid>
                                            <Link to={`/post/${post._id}`} className='cardLink'>

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {post.title}
                                                    </Typography>

                                                    <Typography className="textPreview" variant="body2" color="text.secondary">
                                                        {post.post.split("", 400)}
                                                    </Typography>
                                                </CardContent>
                                            </Link>
                                        </div>
                                        <Grid
                                            container
                                            flexDirection="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ py: .5 }}
                                            className="postFooter">
                                            <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                                {post.category}
                                            </Typography>
                                            <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                                {post.createdAt}
                                            </Typography>
                                        </Grid>
                                    </Card>
                                }
                            </div>

                        ))}
                    </section> :
                        <EmptyProfile userProfile={userProfile} />
                    }
                </div>

            }

            {posts.length > 10 &&

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />

            }

        </section >

    )
}

export default UserProfile