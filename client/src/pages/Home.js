/** MUI STYLING **/
import {
    Box,
    Container,
    Button,
    Grid,
    List,
    ListItemText,
    Typography
} from "@mui/material";

const Home = () => {


    return (
        <section className="homeContainer">
            <article className="heroSection">
                <Box
                    sx={{
                        py: 30,
                        px: 12
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h2" component="h2" gutterBottom={true}>
                            <Typography variant="h2" component="span">Hobbyist</Typography>
                        </Typography>
                        <Typography variant="subtitle1" paragraph={true}>Blog, Explore, and Discover New Passions</Typography>
                    </Grid>
                </Box>
            </article>


            <article className="blogSection">
                <Box
                    sx={{
                        py: 10
                    }}

                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <div>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                wrap="nowrap"
                            >
                                <img className="homePhoto" src="../images/Typing-cuate.png" alt="Write Blogs about hobbies" />
                                <a href="https://storyset.com/work">Work illustrations by Storyset</a>
                            </Grid>
                        </div>

                        <div>
                            <Typography variant="h3" component="h3" gutterBottom={true}>
                                <Typography variant="h3" component="span">Blog</Typography>
                            </Typography>
                            <Typography variant="body1" paragraph={true}>Tips, Tricks, To Dos, How-To's, How Do I's? and I think I Got It's.</Typography>
                            <Typography variant="body1" paragraph={true}>Share your hobbies with others. </Typography>
                        </div>

                    </Grid>
                </Box>
            </article>
            <article className="exploreSection">
                <Box
                    sx={{
                        py: 10
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >

                            <Typography variant="h3" component="h3" gutterBottom={true}>
                                <Typography variant="h3" component="span">Explore</Typography>
                            </Typography>
                            <Typography variant="body1" paragraph={true}>Learn more about what you love with others.</Typography>

                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <img className="homePhoto" src="../images/Collection-amico.png" alt="Explore hobbies photo" />
                                <a href="https://storyset.com/online">Online illustrations by Storyset</a>
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            </article>
            <article className="discoverSection">
                <Box
                    sx={{
                        py: 10
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <div>
                            <Typography variant="h3" component="h3" gutterBottom={true}>
                                <Typography variant="h3" component="span">Discover</Typography>
                            </Typography>
                            <Typography variant="body1" paragraph={true}>Your hobby journey might lead you to a brand new passion.</Typography>
                        </div>

                        <div>
                            <Grid
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                wrap="nowrap"
                            >
                                <img className="homePhoto" src="../images/Enthusiastic-cuate.png" alt="Discover hobbies photo" />
                                <a href="https://storyset.com/people">People illustrations by Storyset</a>
                            </Grid>
                        </div>

                    </Grid>
                </Box>

            </article>
            <article className="getstartedSection">
                <Box
                    sx={{
                        py: 10,
                        px: 10,
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h3" component="h3" gutterBottom={true}>
                            <Typography variant="h3" component="span">Get Started Today</Typography>
                        </Typography>

                        <div className="btnContainer">
                            <button className="loginBtn">Login</button>
                            <button className="signupBtn">Signup</button>
                        </div>
                    </Grid>
                </Box>
            </article>
        </section >
    )
}

export default Home