import { Link } from 'react-router-dom';
import { Author } from './Author';
import Masonry from "react-masonry-css"

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
                        <Card sx={{ width: 300, m: 2 }} elevation={5}>
                            <Grid
                                container
                                flexDirection="row"
                                justifyContent="flex-start"
                                alignitems="center"
                                sx={{ p: 1 }}
                                className="postCard"
                            >
                                <AccountCircleIcon
                                    aria-label="account of current user"
                                    sx={{ height: 30, width: 30 }}
                                    className="profilePhoto"
                                ></AccountCircleIcon>
                                <Typography variant="h5" color="text.primary">
                                    <Author id={post.user} />
                                </Typography>
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
                                        {post.post.split(".", 3)}
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
                                className="postCard"
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
                                className="postCard"
                            >
                                <AccountCircleIcon
                                    aria-label="account of current user"
                                    sx={{ height: 30, width: 30 }}
                                    className="profilePhoto"
                                ></AccountCircleIcon>
                                <Typography variant="h5" >
                                    <Author id={post.user} />
                                </Typography>
                            </Grid>
                            <Divider />
                            <Link to={`/post/${post._id}`}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.post.split(".", 8)}
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
                                className="postCard"
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
        </section >
    )
}

export default latestPosts