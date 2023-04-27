import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";

/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

// Import for Redux
import { registerUser, reset } from '../features/auth/authSlice'

const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            bio: "",
            photo: ""
        }
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const newUser = async (data) => {

        try {
            await dispatch(registerUser(data)).unwrap()
            toast.success('New Account Created')
            navigate('/feed')
        } catch (error) {
            toast.error(error)
        }

    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="signupWrapper"
            sx={{
                p: 7
            }}
        >
            <Grid
                width={700}
                container
                className="signupContainer"
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
                <h2 className='loginTitle'>Signup</h2>
                <Stack>

                    {errors.username && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Username must be 5 characters long</span></Alert>}
                    {errors.email && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Please enter a valid email</span></Alert>}
                    {errors.password && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A password must contain at least 8 Characters, 1 Uppercase Character, 1 lowercase character, 1 Number, and 1 Special Character</span></Alert>}
                    {errors.bio && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A short bio is required.</span></Alert>}
                </Stack>

                <form className="registerForm" onSubmit={handleSubmit(newUser)}>


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

                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="email"
                        {...register("email",
                            {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                                            value
                                        )
                                }
                            })}
                        variant="filled"
                        fullWidth
                        margin="normal"
                    />


                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="Password"
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
                        variant="filled"
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        className="bioContainer"
                        name="bio"
                        label="User Bio"
                        placeholder="Write Bio"
                        fullWidth
                        multiline
                        margin="normal"

                        {...register("bio", { required: true, minLength: 10 })}
                    />

                    <button className="signupBtn" type="submit">Submit</button>

                </form>
                <div>
                    <Link to={"/login"} className='loginLink'>
                        Have an account? Login Now
                    </Link>
                </div>
            </Grid>
        </Box>
    )
}

export default Signup