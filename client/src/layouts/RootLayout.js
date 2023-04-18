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
    Button,
    Tooltip,
    MenuItem,
    Divider

} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';


export default function RootLayout() {

    const { user } = useSelector(
        (state) => state.auth
    )

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={handleOpenNavMenu}
                                            >
                                                <MenuIcon />
                                            </IconButton>

                                            <Menu
                                                id="menu-appbar"
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
                                                    display: { xs: 'block' },
                                                    visibility: {
                                                        md: 'hidden'
                                                    }

                                                }}
                                            >
                                                <MenuItem> <NavLink className="navbar-link" to="/">Home</NavLink></MenuItem>
                                                <div>
                                                    <MenuItem
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        Search
                                                    </MenuItem>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem component={NavLink} to="/explore">
                                                            Explore
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/physical">
                                                            Physical
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/creative">
                                                            Creative
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/mental">
                                                            Mental
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/food">
                                                            Food
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/musical">
                                                            Musical
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/collecting">
                                                            Collecting
                                                        </MenuItem>
                                                        <MenuItem component={NavLink} to="/category/games+puzzles">
                                                            Games/Puzzles
                                                        </MenuItem>
                                                    </Menu>
                                                </div>
                                                <MenuItem> <NavLink className="navbar-link" to="/login">Login</NavLink></MenuItem>
                                                <MenuItem> <NavLink className="navbar-link" to="/signup">Signup</NavLink></MenuItem>
                                            </Menu>
                                        </Box>
                                    </div>
                                    <AdbIcon sx={{
                                        display: { xs: 'flex' },
                                        mr: 1, visibility: {
                                            md: 'hidden'
                                        }
                                    }} />
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        component="a"
                                        href=""
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
                                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                        <MenuItem> <NavLink className="navbar-link" to="/">Home</NavLink></MenuItem>
                                        <div>
                                            <MenuItem
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                Search
                                            </MenuItem>

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem component={NavLink} to="/explore">
                                                    Explore
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/physical">
                                                    Physical
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/creative">
                                                    Creative
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/mental">
                                                    Mental
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/food">
                                                    Food
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/musical">
                                                    Musical
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/collecting">
                                                    Collecting
                                                </MenuItem>
                                                <MenuItem component={NavLink} to="/category/games+puzzles">
                                                    Games/Puzzles
                                                </MenuItem>
                                            </Menu>
                                        </div>

                                        <MenuItem> <NavLink className="navbar-link" to="/login">Login</NavLink></MenuItem>
                                        <MenuItem> <NavLink className="navbar-link" to="/signup">Signup</NavLink></MenuItem>
                                    </Box>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            }
            {user &&
                <AppBar className="muiNav" position="static" color="default">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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

                            <Box sx={{
                                flexGrow: 1, display: { xs: 'flex' }, visibility: {
                                    md: 'hidden'
                                }
                            }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
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
                                        display: { xs: 'block' },
                                        visibility: {
                                            md: 'hidden'
                                        }
                                    }}
                                >

                                    <MenuItem> <NavLink className="navbar-link" to="/">Home</NavLink></MenuItem>
                                    <div>
                                        <MenuItem
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            Search
                                        </MenuItem>

                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem component={NavLink} to="/explore">
                                                Explore
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/physical">
                                                Physical
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/creative">
                                                Creative
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/mental">
                                                Mental
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/food">
                                                Food
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/musical">
                                                Musical
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/collecting">
                                                Collecting
                                            </MenuItem>
                                            <MenuItem component={NavLink} to="/category/games+puzzles">
                                                Games/Puzzles
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    <MenuItem> <NavLink className="navbar-link" to="/feed">Feed</NavLink></MenuItem>
                                    <NavLink className="navbar-link" to="/createNewPost"><MenuItem>NewPost</MenuItem></NavLink>

                                </Menu>
                            </Box>
                            <AdbIcon sx={{
                                display: { xs: 'flex' }, mr: 1, visibility: {
                                    md: 'hidden'
                                }
                            }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
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
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem> <NavLink className="navbar-link" to="/">Home</NavLink></MenuItem>
                                <div>
                                    <MenuItem
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Search
                                    </MenuItem>

                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem component={NavLink} to="/explore">
                                            Explore
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/physical">
                                            Physical
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/creative">
                                            Creative
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/mental">
                                            Mental
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/food">
                                            Food
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/musical">
                                            Musical
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/collecting">
                                            Collecting
                                        </MenuItem>
                                        <MenuItem component={NavLink} to="/category/games+puzzles">
                                            Games/Puzzles
                                        </MenuItem>
                                    </Menu>
                                </div>
                                <MenuItem> <NavLink className="navbar-link" to="/feed">Feed</NavLink></MenuItem>
                                <NavLink className="navbar-link" to="/createNewPost"><MenuItem>NewPost</MenuItem></NavLink>
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Doesn't have profile photo" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Menu
                                    sx={{ mt: '45px', p: 5 }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <p className="profileName">Hello! {user.currentUser.username.toUpperCase()}</p>
                                    <Divider />
                                    <NavLink className="navbar-link" to={`/profile/${user.currentUser.id}`}><MenuItem>Profile</MenuItem></NavLink>
                                    <MenuItem>Favorites</MenuItem>
                                    <MenuItem><LogoutBtn className="navbar-link" to="/logout" /></MenuItem>
                                </Menu>
                            </Box>
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
                            <h4 variant="body1">About us</h4>
                            <Typography variant="caption2">
                                Hobbyist was built with the MERN stack alogn with
                                Redux React Router, and MUI for the
                                2023 Harvard Extension School Capstone project. This project is my copyright material and using it will attract legal action.
                            </Typography>
                            <Box
                                sx={{
                                    mt: 4,
                                }}
                            >
                            </Box>
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