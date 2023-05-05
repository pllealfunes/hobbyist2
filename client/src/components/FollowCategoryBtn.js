import { useState, useEffect } from 'react'
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import axiosPrivate from '../config/useAxiosPrivate'

function FollowCategoryBtn({ category, user }) {
    const [currentUser, setCurrentUser] = useState('');
    const [isFollow, setIsFollow] = useState(false);
    const [initialIsFollow, setInitialIsFollow] = useState(false); // new state variable
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                if (user) {
                    let response = await dispatch(getUser(user.currentUser.id));
                    setCurrentUser(response.payload);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user, dispatch]);

    useEffect(() => {
        (async () => {
            try {
                if (currentUser) {
                    if (currentUser.categories.includes(category)) {
                        setIsFollow(true);
                        setInitialIsFollow(true); // update initial value
                    } else {
                        setIsFollow(false);
                        setInitialIsFollow(false); // update initial value
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [currentUser, category]);

    const followCategory = async () => {
        try {
            await axiosPrivate.put(`/users/${user.currentUser.id}/followCategory/${category}`);
            toast.success(`Now following ${category}`);
            setIsFollow(true);
        } catch (error) {
            toast.error('Try again later');
        }
    };

    const unfollowCategory = async () => {
        try {
            await axiosPrivate.put(`/users/${user.currentUser.id}/unFollowCategory/${category}`);
            toast.success(`Now unfollowing ${category}`);
            setIsFollow(false);
        } catch (error) {
            toast.error('Try again later');
        }
    };

    return (
        <div>
            {user ? (
                <button
                    className="followBtn"
                    onClick={() => {
                        if (isFollow) {
                            unfollowCategory();
                        } else {
                            followCategory();
                        }
                    }}
                >
                    {isFollow ? `Unfollow ${category}` : `Follow ${category}`}
                </button>
            ) : (
                <div>Category: {category}</div>
            )}
        </div>
    );
}

export default FollowCategoryBtn