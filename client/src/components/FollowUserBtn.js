import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axiosPrivate from '../config/useAxiosPrivate'

function FollowUserBtn({ currentUser, id, user, userProfile }) {

    const [isFollow, setIsFollow] = useState('')


    useEffect(() => {
        (async () => {
            try {
                if (currentUser) {
                    if (currentUser.users.includes(id)) {
                        setIsFollow(true)
                    } else {
                        setIsFollow(false)
                    }
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [currentUser, isFollow, id])


    const followUser = async () => {
        try {
            if (user.currentUser.id === id) {
                toast.error('You cannot follow yourself')
            } else {

                await axiosPrivate.put(`/users/${user.currentUser.id}/followUser/${id}`)
                toast.success(`Following ${userProfile.username}`)
                setIsFollow(true)

            }

        } catch (error) {
            toast.error("Try again later")
        }

    }


    const unfollowUser = async () => {
        try {
            if (user.currentUser.id === id) {
                toast.error('You cannot unfollow yourself')
            } else {

                await axiosPrivate.put(`/users/${user.currentUser.id}/unFollowUser/${id}`)
                toast.success(`Unfollowing ${userProfile.username}`)
                setIsFollow(false)

            }

        } catch (error) {

            toast.error("Try again later")
        }

    }


    return (

        <button
            className="followBtn"
            onClick={() => {
                if (isFollow) {
                    unfollowUser();
                } else {
                    followUser();
                }
            }}>
            {isFollow ? "Unfollow" : "Follow"}
        </button >


    )
}

export default FollowUserBtn