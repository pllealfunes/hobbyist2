import { useState, useEffect } from 'react'
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import axiosPrivate from '../config/useAxiosPrivate'

function FollowCategoryBtn({ category, user }) {

    const [currentUser, setCurrentUser] = useState('')
    const [isFollow, setIsFollow] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            try {
                if (user) {
                    let response = await dispatch(getUser(user.currentUser.id))
                    setCurrentUser(response.payload)
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [user, dispatch])

    useEffect(() => {
        (async () => {
            try {
                if (currentUser) {
                    if (currentUser.categories.includes(category)) {
                        setIsFollow(true)
                    } else if (!currentUser.categories.includes(category)) {
                        setIsFollow(false)
                    }
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [currentUser])

    const followCategory = async () => {
        try {
            await axiosPrivate.put(`/users/${user.currentUser.id}/followCategory/${category}`)
            toast.success(`Now following ${category}`)
            setIsFollow(true)
        } catch (error) {
            toast.error("Try again later")
        }

    }

    const unfollowCategory = async () => {
        try {
            await axiosPrivate.put(`/users/${user.currentUser.id}/unFollowCategory/${category}`)
            toast.success(`Now unfollowing ${category}`)
            setIsFollow(false)
        } catch (error) {
            toast.error("Try again later")
        }
    }

    return (
        <div>
            {
                user ?


                    <button
                        className="followBtn"
                        onClick={() => {
                            if (isFollow) {
                                unfollowCategory();
                            } else {
                                followCategory();
                            }
                        }}>
                        {isFollow ? `Unfollow ${category}` : `Follow ${category}`}
                    </button >

                    :

                    <button onClick={() => (navigate('/login'))}>Follow ${category}</button>
            }
        </div>


    )
}

export default FollowCategoryBtn