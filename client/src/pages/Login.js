import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'
import { useForm } from "react-hook-form";

/*** MATERIAL UI STYLING ***/
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const loginUser = async (data) => {
        try {
            await dispatch(login(data)).unwrap()
            toast.success('You are logged in')
            navigate('/feed')
            console.log()
        } catch (error) {
            toast.error(`${error}. Please try again.`)
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
        >

            <Grid
                width={700}
                container
                className="container"
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
                        margin="normal"
                        fullWidth
                    />


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