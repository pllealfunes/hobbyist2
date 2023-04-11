// Pagination Code from Traversy Media the YouTube video is called Simple Frontend Pagination | React

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const CategoryResults = ({ categoryResults }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = categoryResults.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <section className='postsWrapper'>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={categoryResults.length}
                paginate={paginate}
            />
            {currentPosts && currentPosts.map((post) => (
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

export default CategoryResults