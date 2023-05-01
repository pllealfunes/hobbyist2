import { Link } from 'react-router-dom';
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


const latestPosts = ({ latestPosts }) => {


    let newFeed = latestPosts.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA
    })
    newFeed.forEach(post => {
        post.createdAt = new Date(post.createdAt).toLocaleString();
    });

    let currentPosts = newFeed

    return (
        <section className='postsWrapper'>

            {currentPosts && currentPosts.map((post) => (
                <div key={post._id} >
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
        </section >
    )
}

export default latestPosts