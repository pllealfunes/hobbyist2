import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getUser } from '../features/auth/authSlice'
import { useDispatch } from "react-redux";

export const Author = ({ userId }) => {

    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                let response = await dispatch(getUser(userId))
                setAuthor(response.payload)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [userId])


    return (
        <div className="postAuthor">
            <Link to={`/profile/${userId}`}>{author.username}</Link>
        </div>
    )
}
