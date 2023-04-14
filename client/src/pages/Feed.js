import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getUser } from '../features/auth/authSlice'
import axios from 'axios'


const Feed = () => {

    const { user } = useSelector((state) => state.auth)
    const { singleUser } = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([])
    const [feed, setFeed] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                if (user) {
                    await dispatch(getUser(user.currentUser.id))
                    let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/posts`)
                    setPosts(response.data)
                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [user, dispatch])


    useEffect(() => {
        (async () => {
            try {
                let categoryArray
                let userArray
                let removeDuplicates
                if (singleUser) {

                    if (singleUser.categories.length > 0 && singleUser.users.length > 0) {
                        categoryArray = singleUser.categories.map((category) => (
                            posts.filter((post) => post.category === category)
                        )).reduce((prev, curr) =>
                            [...prev, ...curr])

                        userArray = singleUser.users.map((user) => (
                            posts.filter((post) => post.user === user)
                        )).reduce((prev, curr) =>
                            [...prev, ...curr])


                        removeDuplicates = [...new Set([...categoryArray, ...userArray])]
                        setFeed(removeDuplicates)

                    } else if (singleUser.categories.length > 0 && !singleUser.users.length) {
                        categoryArray = singleUser.categories.map((category) => (
                            posts.filter((post) => post.category === category)
                        )).reduce((prev, curr) =>
                            [...prev, ...curr])

                        removeDuplicates = categoryArray
                        setFeed(removeDuplicates)

                    } else if (!singleUser.categories.length && singleUser.users.length > 0) {

                        userArray = singleUser.users.map((user) => (
                            posts.filter((post) => post.user === user)
                        )).reduce((prev, curr) =>
                            [...prev, ...curr])

                        removeDuplicates = userArray
                        setFeed(removeDuplicates)
                    }


                }

            } catch (error) {
                console.log(error);
            }

        })();

    }, [singleUser, posts])




    return (
        <div>
            <div>Feed</div>
            <section>
                {feed && feed.map((post) => (
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
    )
}

export default Feed