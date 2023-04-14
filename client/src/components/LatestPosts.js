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

                {
                    post.photo ?
                        <Card sx={{ width: 300 }} key={post._id}>
                            <Grid
                                container
                                flexDirection="row"
                                justifyContent="flex-start"
                                alignitems="center"
                                sx={{ p: 1 }}
                            >
                                <AccountCircleIcon
                                    size="medium"
                                    aria-label="account of current user"
                                    sx={{ m: 1 }}
                                ></AccountCircleIcon>
                                <Typography variant="h5" color="text.secondary" sx={{ m: 0 }}>
                                    <Author id={post.user} />
                                </Typography>
                            </Grid>
                            {post.photo &&
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`}
                                />}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.post}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Link key={post.category} to={`/posts/${post.category}`}><div className='postCategory'><b>{post.category}</b></div></Link>
                            </CardActions>
                        </Card>

                        :
                        <Card sx={{ width: 300 }} key={post._id}>
                            <Grid
                                container
                                flexDirection="row"
                                justifyContent="flex-start"
                                alignitems="center"
                                sx={{ p: 1 }}
                            >
                                <AccountCircleIcon
                                    size="medium"
                                    aria-label="account of current user"
                                    sx={{ m: 1 }}
                                ></AccountCircleIcon>
                                <Typography variant="h5" color="text.secondary" sx={{ m: 0 }}>
                                    <Author id={post.user} />
                                </Typography>
                            </Grid>
                            {post.photo &&
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`}
                                />}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.post}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Link key={post.category} to={`/posts/${post.category}`}><div className='postCategory'><b>{post.category}</b></div></Link>
                            </CardActions>
                        </Card>

                }
            ))}
        </section>
    )
}

export default latestPosts