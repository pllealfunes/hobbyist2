import { Outlet, NavLink, Link } from "react-router-dom";
import LogoutBtn from '../components/LogoutBtn'
import { useSelector } from 'react-redux'

/** MUI STYLING **/
import {
    Box,
    Grid,
    List,
    ListItemText,
    Typography
} from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function RootLayout() {

    const { user } = useSelector(
        (state) => state.auth
    )


    return (
        <div className="root-layout">
            <header>
                <NavLink className="header-title" to="/"><h1>Hobbyist</h1></NavLink>
                <nav className="navigation">
                    {!user && (
                        <ul>
                            <li> <NavLink className="navbar-link" to="/">Home</NavLink></li>
                            <li> <NavLink className="navbar-link" to="/explore">Explore</NavLink></li>
                            <li> <NavLink className="navbar-link" to="/login">Login</NavLink></li>
                            <li> <NavLink className="navbar-link" to="/signup">Signup</NavLink></li>
                        </ul>
                    )}
                    {user && (
                        <ul>
                            <li> <NavLink className="navbar-link" to="/">Home</NavLink></li>
                            <li><NavLink className="navbar-link" to="/createNewPost">NewPost</NavLink></li>
                            <li> <NavLink className="navbar-link" to="/explore">Explore</NavLink></li>
                            <li> <NavLink className="navbar-link" to="/feed">Feed</NavLink></li>
                            <li><NavLink className="navbar-link" to={`/profile/${user.currentUser.id}`}>{user.currentUser.username.toUpperCase()}</NavLink></li>
                            <li><LogoutBtn className="navbar-link" to="/logout" /></li>
                        </ul>
                    )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>

            <footer>
                <Box
                    sx={{
                        flexGrow: 1,
                        p: { xs: 4, md: 10 },
                        pt: 12,
                        pb: 12,
                        fontSize: { xs: '14px', md: '16px' }
                    }}
                >
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item md={6} lg={4}>
                            <h4 variant="body1">About us</h4>
                            <Typography variant="caption2">
                                Hobbyist was built with the MERN stack alogn with
                                Redux React Router, and MUI for the
                                2023 Harvard Extension School Capstone project.
                                If you see an issues or havy
                                any questions please let me know. Thanks!
                            </Typography>
                            <Box
                                sx={{
                                    mt: 4,
                                }}
                            >
                                <a href="https://github.com/pllealfunes/hobbyist2" target="blank">
                                    <GitHubIcon sx={{ mr: 1 }} />
                                </a>
                                <TwitterIcon sx={{ mr: 1 }} />
                                <InstagramIcon />
                            </Box>
                        </Grid>
                        <Grid item md={3} lg={2}>
                            <h4 variant="body1">Information</h4>
                            <List>
                                <ListItemText>
                                    <Typography lineHeight={2} variant="caption2">
                                        Privacy &amp; Policy
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography lineHeight={2} variant="caption2">
                                        Terms &amp; Conditions
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography lineHeight={2} variant="caption2">
                                        Contact Us
                                    </Typography>
                                </ListItemText>
                            </List>
                        </Grid>
                        <Grid item md={3} lg={2}>
                            <h4 variant="body1">My Account</h4>
                            <List>
                                {!user &&
                                    <div>
                                        <ListItemText>
                                            <Typography lineHeight={2} variant="caption2">
                                                <Link to="/login">
                                                    Login
                                                </Link>
                                            </Typography>
                                        </ListItemText>
                                        <ListItemText>
                                            <Typography lineHeight={2} variant="caption2">
                                                <Link to="/signup">
                                                    Signup
                                                </Link>
                                            </Typography>
                                        </ListItemText>
                                    </div>
                                }
                                {user &&
                                    <div>
                                        <ListItemText>
                                            <Typography lineHeight={2} variant="caption2">
                                                <Link to={`/profile/${user.currentUser.id}`}>
                                                    Profile
                                                </Link>
                                            </Typography>
                                        </ListItemText>
                                        <ListItemText>
                                            <Typography lineHeight={2} variant="caption2">
                                                <LogoutBtn className="footerLogout" to="/logout" />
                                            </Typography>
                                        </ListItemText>
                                    </div>
                                }
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </footer>
        </div>
    )
}