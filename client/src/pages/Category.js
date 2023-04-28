import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { Author } from '../components/Author';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import { regularAxios } from '../config/useAxiosPrivate';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box

} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Category() {

    const { category } = useParams()
    const [postsLoaded, setPostsLoaded] = useState()

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const [currentPosts, setCurrentPosts] = useState('')

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await regularAxios.get('/blog/posts')
                let results = response.data.filter(post => {
                    return post.category === category
                })
                setPostsLoaded(results.reverse())
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [category])

    useEffect(() => {
        if (postsLoaded) {
            setCurrentPosts(postsLoaded.slice(indexOfFirstPost, indexOfLastPost))
        }
    }, [indexOfFirstPost, indexOfLastPost, postsLoaded])

    if (!postsLoaded) {
        return <ErrorMessage />
    }




    return (
        <section className='categoryWrapper'>
            <Box
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="searchWrapper"
            >
                <Grid
                    container
                    className="categoryContainer"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        boxShadow: 2,
                        '& button': { my: 3 },
                    }}
                    width={700}
                >
                    <h2 className="searchTitle">Explore {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
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
                                        <AccountCircleIcon aria-label="user profile photo" sx={{ height: 30, width: 30 }} className="profilePhoto" />
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
                                        <AccountCircleIcon aria-label="user profile photo" sx={{ height: 30, width: 30 }} className="profilePhoto" />
                                        {post.user && <Author userId={post.user} />}
                                    </Grid>
                                    <Link to={`/post/${post._id}`}>

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {post.title}
                                            </Typography>
                                            <Typography className="textPreview" variant="body2" color="text.secondary">
                                                {post.post.split("", 350)}
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
                ))
                }
            </section>
            <Pagination
                className="paginationBar"
                postsPerPage={postsPerPage}
                totalPosts={postsLoaded.length}
                paginate={paginate}
            />

        </section >

    )
}

export default Category