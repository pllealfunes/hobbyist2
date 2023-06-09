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


const CategoryResults = ({ categoryResults }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = categoryResults.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <section className='postsWrapper'>
            <Grid
                className='postsWrapper'
                direction="row"
                alignItems="space-between"
                justifyContent="center"
            >
                {currentPosts && currentPosts.map((post) => (
                    <div className="postCard" key={post._id}>
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
                                        {post.createdAt}
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
                                    <Link to={`/post/${post._id}`} className='cardLink'>

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
                postsPerPage={postsPerPage}
                totalPosts={categoryResults.length}
                paginate={paginate}
            />
            }
        </section>
    )
}

export default CategoryResults