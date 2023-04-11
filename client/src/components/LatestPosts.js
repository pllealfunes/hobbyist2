import { Link } from 'react-router-dom';

const latestPosts = ({ latestPosts }) => {

    return (
        <section className='postsWrapper'>
            {latestPosts && latestPosts.map((post) => (
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
    )
}

export default latestPosts