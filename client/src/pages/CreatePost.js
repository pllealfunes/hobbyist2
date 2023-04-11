import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axiosPrivate from "../config/interceptor";
import axios from 'axios';

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


const CreatNewPost = () => {

    const { user } = useSelector((state) => state.auth)

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            user: user ? user.currentUser.id : null,
            title: "",
            category: "",
            post: "",
            photo: ""
        }
    });

    const [errorsServer, setErrorsServer] = useState("")
    const [selectedPhoto, setSelectedPhoto] = useState("")
    const [selectedPhotoPreview, setSelectedPhotoPreview] = useState("")




    const handlePhoto = (e) => {
        setSelectedPhoto(e.target.files[0])

    }


    const submitNewPost = (data) => {
        const formData = new FormData()
        formData.append('user', data.user);
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('post', data.post);
        formData.append('photo', data.photo[0]);
        console.log(data.photo[0]);
        (async () => {
            try {
                await axios.post(`${process.env.REACT_APP_URL}/api/blog/post/newPost`, formData)
                toast.success("View your profile for your new post!")
                reset()
            } catch (error) {
                if (error.response) setErrorsServer(error.response.data.errors);
                toast.error("Unable to create new post")
            }
        })();
        if (errorsServer) setErrorsServer('')

    }

    return (
        <Box
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center">

            <Grid
                container
                width={700}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="formPostContainer"
                sx={{
                    p: 5,
                    boxShadow: 2,
                    borderRadius: 2,
                    '& button': { my: 3 },
                }}
            >

                <h1 className="createTitle">New Post</h1>

                <form className="postForm" onSubmit={handleSubmit(submitNewPost)}>
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
                        label="Title"
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        {...register("title", { required: true, minLength: 5 })}
                    />


                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="category" >Select...</InputLabel>
                        <Select
                            name="category"
                            className="category"
                            variant="outlined"
                            value={watch("category") || ""}
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


                    <label htmlFor="photo">Upload Photo:
                        <input
                            type="file"
                            name="photo"
                            className="photo"
                            {...register("photo")}
                        />
                    </label>

                    {selectedPhotoPreview && (
                        <img
                            src={selectedPhotoPreview}
                            alt={selectedPhotoPreview.name}
                            height={20}
                            width={30}
                        />
                    )}


                    <TextField
                        className="post"
                        name="post"
                        label="Blog Post"
                        placeholder="Write New Post"
                        fullWidth
                        multiline
                        margin="normal"
                        rows={20}
                        {...register("post", { required: true, minLength: 5 })}
                    />
                    <Button className="submitFormBtn" type="submit" variant="contained" color="success" endIcon={<SendIcon />} fullWidth>Submit</Button>
                </form>

            </Grid>
        </Box>
    );
}

export default CreatNewPost;