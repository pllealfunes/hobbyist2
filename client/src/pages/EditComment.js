import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axiosPrivate from "../config/useAxiosPrivate";
import axios from "axios";


/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const EditComment = () => {

    const navigate = useNavigate
    const { id } = useParams()
    const [errorsServer, setErrorsServer] = useState('')
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/post/comment/${id}`);
                setValue("comment", response.data.comment);
            } catch (error) {
                console.log(error);
                navigate("*")
            }
        }

        fetchComment()

    }, [id, setValue, navigate])


    const submitEditComment = (data) => {
        (async () => {
            try {
                await axiosPrivate.put(`/blog/post/comment/editComment/${id}`, data);
                toast.success("Saved new edit")
            } catch (errors) {
                toast.error("Unable to edit")
                console.log(errors);
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
                    />
                    <button className="submitFormBtn" type="submit">Submit</button>
                </form>
            </Grid>
        </Box>
    )
}

export default EditComment
