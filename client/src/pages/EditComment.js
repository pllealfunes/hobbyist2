import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axiosPrivate from "../config/interceptor";
import axios from 'axios';

const EditComment = () => {

    const navigate = useNavigate
    const { id } = useParams()
    const [errorsServer, setErrorsServer] = useState('')
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                let response = await axiosPrivate.get(`/blog/post/comment/${id}`);
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
            } catch (error) {
                if (error.response) setErrorsServer(error.response.data.errors);
                toast.error("Unable to edit")
            }
        })();
        if (errorsServer) setErrorsServer('')
    }

    return (
        <div className="container">
            <div className='editCommContainer'>
                <h1 className="editCommTitle">Edit Comment</h1>
                <form className="editCommForm" onSubmit={handleSubmit(submitEditComment)}>
                    <label htmlFor='editCommentBox'></label>
                    {errorsServer && errorsServer.map((error) => (
                        <div className="errorMsg" key={error.param}>
                            <div>{error.msg}</div>
                        </div>
                    ))}
                    {errors.comment && <span>Comments must be at least 5 characters long</span>}
                    <textarea
                        name="comment"
                        placeholder="Edit Comment"
                        rows={20}
                        {...register("comment", { required: true, minLength: 5 })}
                    />
                    <button className="submitFormBtn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditComment
