// Pagination Code from Traversy Media the YouTube video is called Simple Frontend Pagination | React

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { Author } from './Author';


import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid

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
                container
                className='postsWrapper'
                direction="row"
                alignItems="space-between"
                justifyContent="center"
            >
                {currentPosts && currentPosts.map((post) => (
                    <div className="postCard" key={post._id}>
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
                }
            </Grid>
            {currentPosts.length > 10 && <Pagination
                className="paginationBar"
                postsPerPage={postsPerPage}
                totalPosts={searchResults.length}
                paginate={paginate}
            />
            }
        </section>
    )
}

export default SearchResults