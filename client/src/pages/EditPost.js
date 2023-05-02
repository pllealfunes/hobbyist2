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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Typography } from '@mui/material';



const EditPost = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate
    const { id } = useParams()
    const [photo, setPhoto] = useState('')
    const [photoExists, setPhotoExists] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [characterCount, setCharacterCount] = useState(0)
    const [selectedImages, setSelectedImages] = useState("");
    const [selectedFile, setSelectedFile] = useState("")
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
                setCharacterCount(response.data.post.length)
            } catch (error) {
                navigate("*")
            }
        }

        fetchPost()

    }, [id, setValue, navigate, photo])


    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setCharacterCount(inputText.length);
        if (inputText.length < 500) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    };

    const removePhoto = () => {
        setPhotoExists(false)
        setSelectedImages("")
        setSelectedFile("")
    }

    const onSelectFile = (event) => {
        setPhotoExists(true);
        setSelectedFile(event.target.files[0]);
        setSelectedImages(URL.createObjectURL(event.target.files[0]));
    };

    const deletePhoto = () => {
        (async () => {
            try {
                await axiosPrivate.put(`/blog/post/editPost/deletePhoto/${id}`, { photo: photo });
                toast.success("Your photo was deleted")
                setPhoto('')
                setSelectedFile("")
                setSelectedImages("")
                setPhotoExists(false)
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


        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        (async () => {
            try {
                await axiosPrivate.put(`/blog/post/editPost/${id}`, formData);
                toast.success("Updated post!")
                setPhoto(selectedFile.name)
            } catch (error) {
                toast.error("Unable to update post")
                console.log(error);
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
            className="editpostWrapper"
        >

            <Grid
                container
                width={700}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="editpostContainer"
                sx={{
                    boxShadow: 2,
                    '& button': { my: 3 },
                }}
            >
                <h1 className="editPostTitle">Edit Post</h1>


                {photo ?
                    <div>
                        <div>
                            <img className="currentPhoto" src={`${process.env.REACT_APP_URL}/public/images/posts/${photo}`} alt={`${photo}`} />
                            <button className="removePhoto" onClick={deletePhoto}>
                                Delete Photo
                            </button>
                        </div>

                        <form className="editPostForm" onSubmit={handleSubmit(submitEditPost)}>
                            {errorsServer && errorsServer.map((error) => (
                                <div className="errorMsg" key={error.param}>
                                    <div>{error.msg}</div>
                                </div>
                            ))}

                            {errors.photo && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Only Images are Allowed</span></Alert>}
                            {errors.title && <Alert severity="error"><AlertTitle>Error</AlertTitle> <span>Titles must be 5 - 50 characters</span></Alert>}
                            {errors.category && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>A category must be selected.</span></Alert>}
                            {errors.post && <Alert severity="error"><AlertTitle>Error</AlertTitle><span>Posts must be at least 500 characters</span></Alert>}

                            <Typography variant="caption" display="block" >* Titles must be at least 5 - 50 characters</Typography>
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
                                <InputLabel htmlFor="category" >Category...</InputLabel>
                                <Select
                                    name="category"
                                    className="category"
                                    label="Category"
                                    labelId='categorySelect'
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


                            <Typography variant="caption">* 500 Minimum Characters</Typography>
                            <TextField
                                className="post"
                                name="post"
                                InputLabelProps={{ shrink: true }}
                                label="Blog Post"
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
                    </div>
                    :
                    <div>
                        <form className="editPostForm" onSubmit={handleSubmit(submitEditPost)}>
                            {errorsServer && errorsServer.map((error) => (
                                <div className="errorMsg" key={error.param}>
                                    <div>{error.msg}</div>
                                </div>
                            ))}

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

                            <Typography variant="caption" display="block" >* Titles must be at least 5 characters long</Typography>
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


                            <Typography variant="caption">* 500 Minimum Characters</Typography>
                            <TextField
                                className="post"
                                name="post"
                                InputLabelProps={{ shrink: true }}
                                label="Blog Post"
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
                    </div>
                }
            </Grid>
        </Box>
    )
}

export default EditPost
