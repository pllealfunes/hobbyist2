// Pagination Code from Traversy Media the YouTube video is called Simple Frontend Pagination | React

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { Author } from './Author';


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


const SearchResults = ({ searchResults }) => {


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <section className='resultsWrapper'>
            <Grid
                className='postsWrapper'
                direction="row"
                alignItems="space-between"
                justifyContent="center"
            >
                {currentPosts && currentPosts.map((post) => (
                    <div className="postCard" key={post._id}>
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
                                    <Typography variant="caption" color="text.primary" sx={{ p: 0.7 }}>
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
                                    <Typography variant="caption" color="text.primary" sx={{ p: 1, fontWeight: 'medium' }}>
                                        {post.timestamp}
                                    </Typography>
                                </Grid>
                            </Card>
                        }

                    </div>
                ))
                }
            </Grid>
            <Pagination
                className="paginationBar"
                postsPerPage={postsPerPage}
                totalPosts={searchResults.length}
                paginate={paginate}
            />
        </section>
    )
}

export default SearchResults