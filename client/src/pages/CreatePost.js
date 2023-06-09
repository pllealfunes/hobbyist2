import { useState } from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosPrivate from "../config/useAxiosPrivate";
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
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Typography } from '@mui/material';


const CreatNewPost = () => {

    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const { register, handleSubmit, reset, watch, resetField, formState: { errors } } = useForm({
        defaultValues: {
            user: user ? user.currentUser.id : null,
            title: "",
            category: "",
            post: "",
            photo: ""
        }
    });


    const [photoExists, setPhotoExists] = useState(false)
    const [selectedImages, setSelectedImages] = useState("");
    const [selectedFile, setSelectedFile] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [characterCount, setCharacterCount] = useState(0)

    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setCharacterCount(inputText.length);
        if (inputText.length < 500) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    };


    const onSelectFile = (event) => {
        setPhotoExists(true);
        setSelectedFile(event.target.files[0]);
        setSelectedImages(URL.createObjectURL(event.target.files[0]));
    };



    const removePhoto = () => {
        setPhotoExists(false)
        setSelectedImages("")
        setSelectedFile("")
    }


    const submitNewPost = (data) => {
        const formData = new FormData()
        formData.append('user', data.user);
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('post', data.post);

        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        (async () => {
            try {
                await axiosPrivate.post('/blog/post/newPost', formData)
                toast.success("Post Created")
                setPhotoExists(false)
                navigate(`/profile/${user.currentUser.id}`)
            } catch (error) {
                toast.error("Unable to create new post")
                console.log(error);
            }
        })();

    }

    return (
        <Box
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="newpostWrapper"
        >

            <Grid
                container
                width={700}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="newpostContainer"
                sx={{
                    boxShadow: 2,
                    '& button': { my: 3 },
                }}
            >

                <h2 className="createTitle">New Post</h2>

                <form className="postForm" onSubmit={handleSubmit(submitNewPost)}>

                    {errors.photo && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Only Images are Allowed</span></Alert>}
                    {errors.title && <Alert severity="error"><AlertTitle>Error</AlertTitle> <span>Titles must be 5 - 50 characters</span></Alert>}
                    {errors.category && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A category must be selected.</span></Alert>}
                    {errors.post && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Posts must be at least 500 characters</span></Alert>}

                    {selectedImages ? <img className="currentPhoto" src={`${selectedImages}`} alt={`${selectedImages}`} /> :
                        <label htmlFor="photo">Upload Photo:
                            <input
                                type="file"
                                name="photo"
                                className="photoInput"
                                accept="image/*"
                                {...register("photo")}
                                onChange={onSelectFile}
                            />
                        </label>}

                    {photoExists && <button type="button" variant="contained" onClick={removePhoto} className="removePhoto">Remove Photo</button>}

                    <Typography variant="caption" display="block" >* Titles must be between 5 - 50 characters</Typography>
                    <TextField
                        className="title"
                        type="text"
                        name="title"
                        label="Title"
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        {...register("title", { required: true, minLength: 5, maxLength: 50 })}
                    />


                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="category" >Category...</InputLabel>
                        <Select
                            name="category"
                            className="category"
                            label="Category"
                            labelId='categorySelect'
                            variant="outlined"
                            value={watch("category") || ""}
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

                    <Typography variant="caption">* 500 Minimum Characters</Typography>
                    <TextField
                        className="post"
                        name="post"
                        label="Blog Post"
                        placeholder="Write New Post"
                        fullWidth
                        multiline
                        margin="normal"
                        rows={20}
                        {...register("post", { required: true, minLength: 500 })}
                        onChange={handleTextChange}
                    />
                    <p>Character count: {characterCount}</p>
                    <button className="submitFormBtn" type="submit" disabled={isButtonDisabled}>Submit</button>

                </form>

            </Grid>
        </Box>
    );
}

export default CreatNewPost;