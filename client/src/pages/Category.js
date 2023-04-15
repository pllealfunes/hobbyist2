import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Author } from '../components/Author';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Divider,
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
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/posts`)
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
                    <h2 className="searchTitle">Explore {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                </Grid>
            </Box>
            <section className='postsWrapper'>
                {currentPosts && currentPosts.map((post) => (
                    <div className="postCard" key={post._id} >
                        {post.photo &&
                            <Card sx={{ width: 300, m: 2 }} elevation={5}>
                                <Grid
                                    container
                                    flexDirection="row"
                                    justifyContent="flex-start"
                                    alignitems="center"
                                    sx={{ p: 1 }}
                                    className="postHeader"
                                >
                                    <AccountCircleIcon
                                        aria-label="account of current user"
                                        sx={{ height: 30, width: 30 }}
                                        className="profilePhoto"
                                    ></AccountCircleIcon>

                                    <Author id={post.user} />

                                </Grid>
                                <Link to={`/post/${post._id}`}>
                                    <CardMedia
                                        component="div"
                                        sx={{ height: 140 }}
                                        image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography className="textPreview" variant="body2" color="text.secondary">
                                            {post.post.split("", 100)}
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <Divider />
                                <Grid
                                    container
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignitems="center"
                                    sx={{ p: 1 }}
                                    className="postFooter"
                                >
                                    <Typography component="div" className='postCategory' color="text.primary" sx={{ fontWeight: "bold" }}>{post.category}</Typography>
                                    <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                        {post.timestamp}
                                    </Typography>
                                </Grid>
                            </Card>
                        }

                        {!post.photo &&
                            <Card sx={{ width: 300, m: 2 }} elevation={5}>
                                <Grid
                                    container
                                    flexDirection="row"
                                    justifyContent="flex-start"
                                    alignitems="center"
                                    sx={{ p: 2 }}
                                    className="postHeader"
                                >
                                    <AccountCircleIcon
                                        aria-label="account of current user"
                                        sx={{ height: 30, width: 30 }}
                                        className="profilePhoto"
                                    ></AccountCircleIcon>

                                    <Author id={post.user} />

                                </Grid>
                                <Divider />
                                <Link to={`/post/${post._id}`}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.post.split("", 200)}
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <Divider />
                                <Grid
                                    container
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignitems="center"
                                    sx={{ p: 1 }}
                                    className="postFooter"
                                >
                                    <Typography component="div" className='postCategory' color="text.primary" sx={{ fontWeight: 'bold' }}>{post.category}</Typography>
                                    <Typography variant="caption" color="text.primary" sx={{ p: 1 }}>
                                        {post.timestamp}
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