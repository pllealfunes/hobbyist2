import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import LogoutBtn from '../components/LogoutBtn'
import { useSelector } from 'react-redux'

/** MUI STYLING **/
import {
    Box,
    Grid,
    List,
    ListItemText,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,

} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';


export default function RootLayout() {

    const { user } = useSelector(
        (state) => state.auth
    )

    const [anchorElNav, setAnchorElNav] = useState(null)


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };







    return (
        <div className="root-layout">
            {!user &&
                <Box sx={{ display: 'flex' }}>
                    <AppBar position="static" color="default">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                <Grid
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    container
                                >
                                    <div>
                                        <Tooltip title="home" placement="bottom-start">
                                            <Typography
                                                variant="h6"
                                                noWrap
                                                component="a"
                                                href="/"
                                                sx={{
                                                    mr: 2,
                                                    display: { xs: 'none', md: 'flex' },
                                                    fontFamily: 'monospace',
                                                    fontWeight: 700,
                                                    letterSpacing: '.3rem',
                                                    color: 'inherit',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                Hobbyist
                                            </Typography>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                display: { xs: 'flex' },
                                                visibility: {
                                                    md: 'hidden'
                                                }
                                            }}
                                        >
                                            <IconButton
                                                size="large"
                                                aria-label="no user mobile view"
                                                aria-controls="menu-appbar-mobile-nouser"
                                                aria-haspopup="true"
                                                onClick={handleOpenNavMenu}
                                            >
                                                <MenuIcon />
                                            </IconButton>

                                            <Menu
                                                classanme="menu-appbar"
                                                anchorEl={anchorElNav}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                open={Boolean(anchorElNav)}
                                                onClose={handleCloseNavMenu}
                                                sx={{
                                                    display: { xs: 'block', md: 'none' },
                                                }}
                                            >
                                                <NavLink className="navbar-link" to="/explore"><MenuItem>Explore</MenuItem></NavLink>
                                                <NavLink className="navbar-link" to="/login"><MenuItem>Login</MenuItem></NavLink>
                                                <NavLink className="navbar-link" to="/signup"><MenuItem>Signup</MenuItem></NavLink>
                                            </Menu>
                                        </Box>
                                    </div>
                                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                    <Tooltip title="home" placement="bottom-start">
                                        <Typography
                                            variant="h5"
                                            noWrap
                                            component="a"
                                            href="/"
                                            sx={{
                                                mr: 2,
                                                display: { xs: 'flex' },
                                                visibility: {
                                                    md: 'hidden'
                                                },
                                                flexGrow: 1,
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: 'inherit',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Hobbyist
                                        </Typography>
                                    </Tooltip>
                                    <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "center", alignItems: "center" }}>
                                        <NavLink className="navbar-link" to="/explore"><MenuItem>Explore</MenuItem></NavLink>
                                        <NavLink className="loginBtnNav" to="/login"><MenuItem>Login</MenuItem></NavLink>
                                        <NavLink className="signupBtnNav" to="/signup"><MenuItem>Signup</MenuItem></NavLink>
                                    </Box>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            }
            {user &&
                <AppBar position="static" color="default">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>



                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <div>
                                <Tooltip title="home" placement="bottom-start">
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        href="/"
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'none', md: 'flex' },
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Hobbyist
                                    </Typography>
                                </Tooltip>
                            </div>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="user web view"
                                    aria-controls="menu-appbar-web-user"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                >
                                    <MenuIcon />
                                </IconButton>


                                <Menu
                                    id="menu-appbar-loggedin"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <NavLink className="navbar-link" to="/explore"><MenuItem>Explore</MenuItem></NavLink>
                                    <NavLink className="navbar-link" to="/feed"><MenuItem>Feed</MenuItem></NavLink>
                                    <NavLink className="navbar-link" to="/createNewPost"><MenuItem>NewPost</MenuItem></NavLink>
                                    <MenuItem><LogoutBtn className="navbar-link" to="/logout" /></MenuItem>
                                </Menu>
                            </Box>



                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                            >
                                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                <Tooltip title="home" placement="bottom-start">
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="a"
                                        href="/"
                                        sx={{
                                            mr: 2,
                                            display: { xs: 'flex', md: 'none' },
                                            flexGrow: 1,
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Hobbyist
                                    </Typography>
                                </Tooltip>
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, }}>
                                    <NavLink className="navbar-link" to="/explore"><MenuItem>Explore</MenuItem></NavLink>
                                    <NavLink className="navbar-link" to="/feed"><MenuItem>Feed</MenuItem></NavLink>
                                    <NavLink className="navbar-link" to="/createNewPost"><MenuItem>NewPost</MenuItem></NavLink>
                                    <MenuItem><LogoutBtn className="navbar-link" to="/logout" /></MenuItem>
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <p className="profileName">Hello! {user.currentUser.username.toUpperCase()}</p>
                                        <Tooltip title="profile">
                                            <NavLink className="navbar-link" to={`/profile/${user.currentUser.id}`}>
                                                <IconButton sx={{ p: 0 }}>
                                                    <Avatar alt="Doesn't have profile photo" />
                                                </IconButton>
                                            </NavLink>
                                        </Tooltip>
                                    </Grid>
                                </Box>

                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
            }

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
                            <Typography variant="h5">About us</Typography>
                            <Typography variant="caption2">
                                Hobbyist was built with the MERN stack along with
                                Redux React Router, and MUI for the
                                2023 Harvard Extension School Capstone project. Photos are not mine and belong to respected owners. README contains resources used. This project is my copyright material and using it will attract legal action.
                            </Typography>
                            <Box
                                sx={{
                                    mt: 4,
                                }}
                            >
                            </Box>
                        </Grid>
                        <Grid item md={3} lg={2}>
                            <Typography variant="h5">My Account</Typography>
                            {!user &&
                                <List>
                                    <ListItemText>
                                        <Typography lineHeight={2} variant="caption2">
                                            <Link to="/login" className="loginFooter">
                                                Login
                                            </Link>
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText>
                                        <Typography lineHeight={2} variant="caption2">
                                            <Link to="/signup" className="signupFooter">
                                                Signup
                                            </Link>
                                        </Typography>
                                    </ListItemText>
                                </List>
                            }
                            {user &&
                                <List>
                                    <ListItemText>
                                        <Typography lineHeight={2} variant="caption2">
                                            <Link className="footerProfile" to={`/profile/${user.currentUser.id}`}>
                                                Profile
                                            </Link>
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText>
                                        <Typography lineHeight={2} variant="caption2">
                                            <LogoutBtn className="footerLogout" to="/logout" />
                                        </Typography>
                                    </ListItemText>
                                </List>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </footer>
        </div>
    )
}