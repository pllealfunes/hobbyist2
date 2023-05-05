import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axiosPrivate from "../config/useAxiosPrivate";
import axios from "axios";


/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';



const EditComment = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [postId, setPostId] = useState("")
    const [errorsServer, setErrorsServer] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [characterCount, setCharacterCount] = useState(0)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/comment/${id}`);
                setValue("comment", response.data.comment);
                setPostId(response.data.postId)
                setCharacterCount(response.data.comment.length)
            } catch (error) {
                console.log(error);
                navigate("*")
            }
        }

        fetchComment()

    }, [id, setValue, navigate])



    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setCharacterCount(inputText.length);
        if (inputText.length < 5) {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    };


    const submitEditComment = (data) => {
        (async () => {
            try {
                await axiosPrivate.put(`/blog/post/comment/editComment/${id}`, data);
                toast.success("Saved new edit")
                navigate(`/post/${postId}`)
            } catch (error) {
                toast.error("Unable to edit")
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
                width={800}
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="editCommContainer"
                sx={{
                    boxShadow: 2,
                    '& button': { my: 3 },
                }}
            >
                <h2 className="editCommTitle">Edit Comment</h2>
                <form className="editCommForm" onSubmit={handleSubmit(submitEditComment)}>
                    {errors.comment && <span>Comments must be at least 5 characters long</span>}
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography variant="caption">* 5 Minimum Characters</Typography>
                    </Grid>
                    <TextField
                        name="comment"
                        rows={10}
                        label="Edit Comment Box"
                        InputLabelProps={{ shrink: true }}
                        className="editCommentBox"
                        multiline
                        margin="normal"
                        id="editCommentBox"
                        InputProps={{ sx: { width: { xs: 350, md: 700 } } }}
                        {...register("comment", { required: true, minLength: 5 })}
                        onChange={handleTextChange}
                    />
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <p>Character count: {characterCount}</p>
                    </Grid>
                    <button className="submitFormBtn" type="submit" disabled={isButtonDisabled}>Submit</button>
                </form>
            </Grid>
        </Box>
    )
}

export default EditComment
