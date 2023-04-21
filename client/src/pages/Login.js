import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'
import { useForm } from "react-hook-form";
import { useState } from 'react';


/** MUI STYLING **/
import {
    Box,
    Grid,
    Button,
    Alert,
    AlertTitle,
    FormControl,
    InputLabel,
    InputAdornment,
    TextField,
    FilledInput
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [failLogin, setFailLogin] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginUser = async (data) => {
        try {
            await dispatch(login(data)).unwrap()
            toast.success('You are logged in')
            navigate('/feed')
        } catch (error) {
            setFailLogin(true)
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="loginWrapper"
            sx={{
                p: 6
            }}
        >

            <Grid
                width={700}
                container
                className="loginContainer"
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    p: 5,
                    boxShadow: 2,
                    borderRadius: 2,
                    '& button': { my: 3 },
                }}
            >
                <AccountCircleIcon sx={{ fontSize: 80 }} />
                <h2 className='loginTitle'>LOGIN</h2>
                <form className="loginForm" onSubmit={handleSubmit(loginUser)}>

                    {errors.username && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Username must be 5 characters long</span></Alert>}
                    {errors.password && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A password must contain at least 8 Characters, 1 Uppercase Character, 1 lowercase character, 1 Number, and 1 Special Character</span></Alert>}
                    {failLogin && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Unable to Login. Please be sure Username and Password are Correct.</span></Alert>}

                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="Username"
                        {...register("username", { required: true, minLength: 5 })}
                        variant="filled"
                        fullWidth
                        margin="normal"
                    />

                    <FormControl variant="filled" fullWidth margin="normal">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="password"
                            name="password"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                required: true,
                                validate: {
                                    checkLength: (value) => value.length >= 8,
                                    matchPattern: (value) =>
                                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                            value
                                        )
                                }
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button className="loginBtn" type="submit" color="success" variant="contained" fullWidth>Submit</Button>

                </form>
                <div>
                    <Link to={"/signup"}>
                        Don't have an account? Create an Account
                    </Link>
                </div>
            </Grid>
        </Box>
    )
}

export default Login