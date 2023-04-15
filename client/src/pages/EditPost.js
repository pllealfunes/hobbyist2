import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axiosPrivate from "../config/useAxiosPrivate";
import axios from "axios";


/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const EditPost = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate
    const { id } = useParams()
    const [photo, setPhoto] = useState('')
    const [errorsServer, setErrorsServer] = useState('')
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            user: user ? user.currentUser.id : null
        }
    });


    useEffect(() => {
        const fetchPost = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/${id}`);
                setValue("title", response.data.title);
                setValue("category", response.data.category);
                setValue("post", response.data.post);
                if (response.data.photo) {
                    setValue("photo", response.data.photo);
                } else {
                    setValue("photo", null);
                }
                setPhoto(response.data.photo)

            } catch (error) {
                navigate("*")
            }
        }

        fetchPost()

    }, [id, setValue, navigate])


    const deletePhoto = () => {
        (async () => {
            try {
                await axiosPrivate.put(`/blog/post/editPost/deletePhoto/${id}`, { photo: photo });
                toast.success("Your photo was deleted")
                setPhoto('')
            } catch (error) {
                if (error.response) setErrorsServer(error.response.data.errors);
                toast.error("Unable to delete photo")
            }
        })();
        if (errorsServer) setErrorsServer('')
    }



    const submitEditPost = (data) => {
        const formData = new FormData()
        formData.append('user', data.user);
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('post', data.post);


        if (data.photo) {
            formData.append('photo', data.photo[0]);
        }

        (async () => {
            try {
                await axiosPrivate.put(`/blog/post/editPost/${id}`, formData);
                toast.success("Updated post!")
                setPhoto(data.photo[0].name)
            } catch (error) {
                if (error.response) setErrorsServer(error.response.data.errors);
                toast.error("Unable to update post")
            }
        })();
        if (errorsServer) setErrorsServer('')

    }

    return (
        <Box
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="editpostContainer"
        >

            <Grid
                container
                width={700}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="formeditContainer"
                sx={{
                    boxShadow: 2,
                    '& button': { my: 3 },
                }}
            >
                <h1 className="editPostTitle">Edit Post</h1>


                {photo ?
                    <div>
                        <div>
                            <img className="currentPhoto" src={`http://localhost:5000/public/images/${photo}`} alt={`${photo}`} />
                            <button onClick={deletePhoto}>
                                Delete Photo
                            </button>
                        </div>

                        <form className="editPostForm" onSubmit={handleSubmit(submitEditPost)}>
                            {errorsServer && errorsServer.map((error) => (
                                <div className="errorMsg" key={error.param}>
                                    <div>{error.msg}</div>
                                </div>
                            ))}

                            {errors.title && <Alert severity="error"><AlertTitle>Error</AlertTitle> <span>Titles must be at least 5 characters long</span></Alert>}
                            {errors.category && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A category must be selected.</span></Alert>}
                            {errors.post && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Posts must be at least 5 characters long</span></Alert>}

                            <TextField
                                className="title"
                                type="text"
                                name="title"
                                InputLabelProps={{ shrink: true }}
                                label="Title"
                                fullWidth
                                margin="normal"
                                {...register("title", { required: true, minLength: 5 })}
                            >
                            </TextField>


                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="category" >Category</InputLabel>
                                <Select
                                    name="category"
                                    className="category"
                                    label="Category"
                                    value={watch('category') || ''}
                                    {...register("category", { required: true })}
                                >
                                    <MenuItem value="physical">Physical</MenuItem>
                                    <MenuItem value="creative">Creative</MenuItem>
                                    <MenuItem value="mental">Mental</MenuItem>
                                    <MenuItem value="food">Food</MenuItem>
                                    <MenuItem value="musical">Musical</MenuItem>
                                    <MenuItem value="collecting">Collecting</MenuItem>
                                    <MenuItem value="games+puzzles">Games+Puzzles</MenuItem>
                                </Select>
                            </FormControl>



                            <TextField
                                className="post"
                                name="post"
                                InputLabelProps={{ shrink: true }}
                                label="Blog Post"
                                fullWidth
                                multiline
                                margin="normal"
                                rows={20}
                                {...register("post", { required: true, minLength: 5 })}
                            />



                            <Button className="submitFormBtn" type="submit" variant="contained" color="success" endIcon={<SendIcon />} fullWidth>Submit</Button>
                        </form>
                    </div>
                    :
                    <div>
                        <form className="editPostForm" onSubmit={handleSubmit(submitEditPost)}>
                            {errorsServer && errorsServer.map((error) => (
                                <div className="errorMsg" key={error.param}>
                                    <div>{error.msg}</div>
                                </div>
                            ))}

                            {errors.title && <Alert severity="error"><AlertTitle>Error</AlertTitle> <span>Titles must be at least 5 characters long</span></Alert>}
                            {errors.category && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A category must be selected.</span></Alert>}
                            {errors.post && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Posts must be at least 5 characters long</span></Alert>}

                            <label htmlFor="photo">Upload Photo:
                                <input
                                    type="file"
                                    name="photo"
                                    className="photoInput"
                                    {...register("photo")}
                                />
                            </label>


                            <TextField
                                className="title"
                                type="text"
                                name="title"
                                InputLabelProps={{ shrink: true }}
                                label="Title"
                                fullWidth
                                margin="normal"
                                {...register("title", { required: true, minLength: 5 })}
                            >
                            </TextField>


                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="category" >Category</InputLabel>
                                <Select
                                    name="category"
                                    className="category"
                                    label="Category"
                                    value={watch('category') || ''}
                                    {...register("category", { required: true })}
                                >
                                    <MenuItem value="physical">Physical</MenuItem>
                                    <MenuItem value="creative">Creative</MenuItem>
                                    <MenuItem value="mental">Mental</MenuItem>
                                    <MenuItem value="food">Food</MenuItem>
                                    <MenuItem value="collecting">Collecting</MenuItem>
                                    <MenuItem value="games+puzzles">Games+Puzzles</MenuItem>
                                </Select>
                            </FormControl>



                            <TextField
                                className="post"
                                name="post"
                                InputLabelProps={{ shrink: true }}
                                label="Blog Post"
                                fullWidth
                                multiline
                                margin="normal"
                                rows={20}
                                {...register("post", { required: true, minLength: 5 })}
                            />



                            <Button className="submitFormBtn" type="submit" variant="contained" color="success" endIcon={<SendIcon />} fullWidth>Submit</Button>
                        </form>
                    </div>
                }
            </Grid>
        </Box>
    )
}

export default EditPost
