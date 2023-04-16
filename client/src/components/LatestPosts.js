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

} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const latestPosts = ({ latestPosts }) => {

    return (
        <section className='postsWrapper'>

            {latestPosts && latestPosts.map((post) => (
                <div key={post._id} >
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
            ))
            }
        </section >
    )
}

export default latestPosts