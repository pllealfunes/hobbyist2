import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getUser } from '../features/auth/authSlice'
import { useDispatch } from "react-redux";

export const Author = ({ id }) => {

    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                let response = await dispatch(getUser(id))
                setAuthor(response.payload)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id])


    return (
        <div>
            <Link to={`/profile/${id}`}><button>{author.username}</button></Link>
        </div>
    )
}
