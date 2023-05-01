import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Author } from '../components/Author';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/** MUI STYLING **/
import {
    Box,
    Grid,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Home = () => {


    const [cards, setCards] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/posts`)
                const lastPosts = response.data.slice(-3)
                let newFeed = lastPosts.sort((a, b) => {
                    const dateA = new Date(a.createdAt)
                    const dateB = new Date(b.createdAt)
                    return dateB - dateA
                })
                newFeed.forEach(post => {
                    post.createdAt = new Date(post.createdAt).toLocaleString();
                });
                setCards(newFeed.reverse())
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [])


    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [cards]);


    return (
        <section className="homeContainer">
            <div className="heroSection">

                <div className="titleContainer">
                    <Typography variant="h1" component="h1" gutterBottom={true}>
                        <Typography variant="h1" component="span">Hobbyist</Typography>
                    </Typography>
                    <Typography variant="h5" paragraph={true}>Blog, Explore, and Discover New Passions</Typography>
                </div>


                <div className="carousel-container">
                    <div className="carousel-items-container">
                        {cards.map((post, index) => (
                            <Card
                                key={index}
                                sx={{
                                    maxHeight: 500,
                                    maxWidth: 400,
                                    minHeight: 500,
                                    minWidth: 400,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    opacity: index === activeIndex ? 1 : 0,
                                    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                                    position: "absolute"
                                }}
                                elevation={5}
                                className={`carousel-item ${index === activeIndex ? 'active' : (index < activeIndex ? 'prev' : 'next')}`}
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
                                        <AccountCircleIcon
                                            aria-label="account of current user"
                                            sx={{ height: 30, width: 30 }}
                                            className="profilePhoto"
                                        />
                                        {post.user && <Author userId={post.user} />}
                                    </Grid>
                                    <Link to={`/post/${post._id}`} className="cardLink">
                                        {post.photo && (
                                            <CardMedia
                                                component="div"
                                                sx={{ height: 200 }}
                                                image={`${process.env.REACT_APP_URL}/public/images/posts/${post.photo}`}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" className="postTitle">
                                                {post.title}
                                            </Typography>
                                            {post.photo ? (
                                                <Typography className="textPreview" variant="body2" color="text.secondary">
                                                    {post.post.split("", 200)}
                                                </Typography>
                                            ) : (
                                                <Typography className="textPreview" variant="body2" color="text.secondary">
                                                    {post.post.split("", 700)}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </Link>
                                </div>
                                <Grid
                                    container
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ py: 0.5 }}
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
                        ))}
                    </div>
                </div>
            </div >


            <div>
                <div className="infoSection">
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Card
                            sx={{
                                maxHeight: 550,
                                maxWidth: 350,
                                minHeight: 550,
                                minWidth: 350,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                px: 4,
                                borderRadius: 4,
                                margin: 3
                            }}
                            elevation={5}>

                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ m: 2 }}>

                                <img className="homePhoto" src="../images/Typing-cuate.png" alt="Write Blogs about hobbies" />
                                <a hidden href="https://storyset.com/work">Work illustrations by Storyset</a>

                            </Grid>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: 1 }}>
                                <Typography variant="h5"
                                    color="text.primary"
                                    sx={{ fontWeight: "bold" }}>
                                    Blog
                                </Typography>

                            </Grid>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: .5 }}>
                                <Typography variant="body1"
                                    color="text.primary"
                                >
                                    Blog about your hobbies. Share your Tips, Tricks, To Dos, How-To's, How Do I's? and I think I Got It's.
                                </Typography>

                            </Grid>
                        </Card>

                        <Card
                            sx={{
                                maxHeight: 550,
                                maxWidth: 350,
                                minHeight: 550,
                                minWidth: 350,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                px: 4,
                                borderRadius: 4,
                                margin: 3
                            }}
                            elevation={5}>

                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ m: 2 }}>
                                <img className="homePhoto" src="../images/Collection-amico.png" alt="Explore hobbies photo" />
                                <a hidden href="https://storyset.com/online">Online illustrations by Storyset</a>
                            </Grid>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: .1 }}>
                                <Typography variant="h5"
                                    color="text.primary"
                                    sx={{ fontWeight: "bold" }}>
                                    Explore
                                </Typography>

                            </Grid>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: .5 }}>
                                <Typography variant="body1"
                                    color="text.primary"
                                >
                                    Explore more about you what you love. In the process you might just find a new love or even an old one.
                                </Typography>

                            </Grid>
                        </Card>
                        <Card
                            sx={{
                                maxHeight: 550,
                                maxWidth: 350,
                                minHeight: 550,
                                minWidth: 350,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                px: 4,
                                borderRadius: 4,
                                margin: 3
                            }}
                            elevation={5}>

                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ m: 2 }}>
                                <img className="homePhoto" src="../images/Enthusiastic-cuate.png" alt="Discover hobbies photo" />
                                <a hidden href="https://storyset.com/people">People illustrations by Storyset</a>
                            </Grid>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ pm: 1 }}>
                                <Typography variant="h5"
                                    color="text.primary"
                                    sx={{ fontWeight: "bold" }}>
                                    Discover
                                </Typography>

                            </Grid>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: .5 }}>
                                <Typography variant="body1"
                                    color="text.primary"
                                >
                                    Discover categroies and users that fuel your passions, and follow each others journey for inspiration.
                                </Typography>

                            </Grid>
                        </Card>
                    </Grid>
                </div>
            </div>

        </section >
    )
}

export default Home