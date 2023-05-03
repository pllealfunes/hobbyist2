import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import axios from 'axios'

import { Author } from '../components/Author';
import Pagination from '../components/Pagination'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Divider,
    Grid,
    Box

} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmptyFeed from '../components/EmptyFeed'

const Feed = () => {

    const { user } = useSelector((state) => state.auth)
    const { singleUser } = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([])
    const [feed, setFeed] = useState([])
    const dispatch = useDispatch()


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [currentPosts, setCurrentPosts] = useState([])

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        (async () => {
            try {
                if (user) {
                    await dispatch(getUser(user.currentUser.id))
                    let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/posts`)
                    setPosts(response.data)
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [user, dispatch])



    useEffect(() => {
        (async () => {
            try {
                let categoryArray
                let userArray
                let removeDuplicates
                if (singleUser) {

                    if (singleUser.categories.length > 0 && singleUser.users.length > 0) {

                        categoryArray = singleUser.categories.map((category) => (
                            posts.filter((post) => post.category === category)
                        )).reduce((prev, curr) =>
                            [...prev, ...curr])

                        userArray = singleUser.users.map((user) => (
                            posts.filter((post) => post.user === user)
                        )).reduce((prev, curr) =>
                            [...prev, ...curr])

                        removeDuplicates = [...new Set([...categoryArray, ...userArray])]
                        setFeed(removeDuplicates)
                    }


                    else if (singleUser.categories.length > 0 && !singleUser.users.length) {

                        const categoryArray = posts.filter(post =>
                            singleUser.categories.includes(post.category)
                        );

                        setFeed(categoryArray)

                    } else if (!singleUser.categories.length && singleUser.users.length > 0) {

                        const userArray = posts.filter(post =>
                            singleUser.users.includes(post.user)
                        );


                        setFeed(userArray)
                    }

                }



            } catch (error) {
                console.log(error);
            }

        })();

    }, [posts])


    useEffect(() => {
        if (feed) {
            let newFeed = feed.sort((a, b) => {
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                return dateB - dateA
            })
            newFeed.forEach(post => {
                post.createdAt = new Date(post.createdAt).toLocaleString();
            });
            setCurrentPosts(newFeed.slice(indexOfFirstPost, indexOfLastPost))
        }
    }, [indexOfFirstPost, indexOfLastPost, feed])



    return (
        <section className='feedWrapper'>
            <Box
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="searchWrapper"
            >
                <Grid
                    container
                    className="feedContainer"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        boxShadow: 2,
                        '& button': { my: 3 },
                    }}
                    width={700}
                >
                    <h2 className="searchTitle">Feed</h2>
                </Grid>
            </Box>
            <section className='feedpostsWrapper'>
                {currentPosts && currentPosts.length > 0 ? currentPosts.map((post) => (
                    <div className="postCard" key={post._id} >
                        {post.photo &&
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
                                elevation={5}
                            >
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
                                            <Typography gutterBottom variant="h6" component="div" className='postTitle'>
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
                                    className="postFooter"
                                >
                                    <Typography component="div" className="postCategory" color="text.primary" sx={{ fontWeight: "bold" }}>
                                        {post.category}
                                    </Typography>
                                    <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                        {post.createdAt}
                                    </Typography>
                                </Grid>
                            </Card>

                        }

                        {!post.photo &&
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
                                    <Grid container flexDirection="row" justifyContent="flex-start" alignItems="center" sx={{ p: 1 }} className="postHeader">
                                        <AccountCircleIcon aria-label="account of current user" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                        {post.user && <Author userId={post.user} />}
                                    </Grid>
                                    <Link to={`/post/${post._id}`} className='cardLink'>

                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
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
                ))
                    :
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
                            <Typography variant="h5">Welcome to your Feed!</Typography>
                            <Typography variant="subtitle1">Follow Users and Categories to see their posts Here!</Typography>
                        </Grid>
                    </section>
                }
            </section>

            {feed.length > 10 &&

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={feed.length}
                    paginate={paginate}
                />


            }
        </section >
    )
}

export default Feed