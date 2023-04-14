import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import axios from "axios"
import { toast } from 'react-toastify'
import axiosPrivate from '../config/useAxiosPrivate';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const { singleUser } = useSelector((state) => state.auth)
    const { id } = useParams()
    const [userProfile, setUserProfile] = useState('')
    const [isFollow, setIsFollow] = useState('')
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            try {

                let userProfile = await dispatch(getUser(id))
                console.log(userProfile.payload);
                setUserProfile(userProfile.payload)
                let response = await axiosPrivate.get(`/blog/post/user/${id}`)
                setPosts(response.data)
                if (id && user) {
                    await dispatch(getUser(user.currentUser.id))
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [id, dispatch, user])


    useEffect(() => {
        (async () => {
            try {
                if (singleUser) {
                    if (singleUser.users.includes(id)) {
                        setIsFollow(true)
                    } else if (!singleUser.users.includes(id)) {
                        setIsFollow(false)
                    }
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [singleUser, id])

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
        <div>
            {user ?

                user.currentUser.id !== id ?
                    <div>
                        <h2>{userProfile.username}</h2>
                        <p>{userProfile.bio}</p>
                        <button
                            className="followBtn"
                            onClick={() => {
                                if (isFollow) {
                                    unfollowUser();
                                } else {
                                    followUser();
                                }
                            }}
                        >
                            {isFollow ? "Unfollow" : "Follow"}
                        </button>
                        <div>
                            {userProfile.users?.length > 0 ? <p>Following {userProfile.users.length}</p> : <p>Following 0</p>}
                            {userProfile.categories?.length > 0 ? <p>Categories {userProfile.categories.length}</p> : <p>Categories 0</p>}
                        </div>
                        <section>
                            {posts && posts.map((post) => (
                                <article key={post._id} className='postContainer'>
                                    <Link to={`/post/${post._id}`}>
                                        <h3 className='postTitle'>{post.title}</h3>
                                    </Link>
                                    <p>{post.post}</p>
                                    <div className='postFooter'>
                                        <Link key={post.category} to={`/posts/${post.category}`}><div className='postCategory'><b>{post.category}</b></div></Link>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </div>

                    :

                    <div>
                        <h2>{userProfile.username}</h2>
                        <p>{userProfile.bio}</p>
                        <Link to={`/editProfile/${userProfile.id}`}><button>Edit Profile</button></Link>
                        <div>
                            {userProfile.users?.length > 0 ? <p>Following {userProfile.users.length}</p> : <p>Following 0</p>}
                            {userProfile.categories?.length > 0 ? <p>Categories {userProfile.categories.length}</p> : <p>Categories 0</p>}
                        </div>
                        <section>
                            {posts && posts.map((post) => (
                                <article key={post._id} className='postContainer'>
                                    <Link to={`/post/${post._id}`}>
                                        <h3 className='postTitle'>{post.title}</h3>
                                    </Link>
                                    <p>{post.post}</p>
                                    <div className='postFooter'>
                                        <Link key={post.category} to={`/posts/${post.category}`}><div className='postCategory'><b>{post.category}</b></div></Link>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </div>


                :
                <div>
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                    <div>
                        {userProfile.users?.length > 0 ? <p>Following {userProfile.users.length}</p> : <p>Following 0</p>}
                        {userProfile.categories?.length > 0 ? <p>Categories {userProfile.categories.length}</p> : <p>Categories 0</p>}
                    </div>
                    <button onClick={() => (navigate('/login'))}>Follow User</button>
                    <section>
                        {posts && posts.map((post) => (
                            <article key={post._id} className='postContainer'>
                                <Link to={`/post/${post._id}`}>
                                    <h3 className='postTitle'>{post.title}</h3>
                                </Link>
                                <p>{post.post}</p>
                                <div className='postFooter'>
                                    <Link key={post.category} to={`/posts/${post.category}`}><div className='postCategory'><b>{post.category}</b></div></Link>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            }
        </div>

    )
}

export default UserProfile