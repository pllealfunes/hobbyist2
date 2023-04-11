// Pagination Code from Traversy Media the YouTube video is called Simple Frontend Pagination | React

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const SearchResults = ({ searchResults }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <section className='searchWrapper'>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={searchResults.length}
                paginate={paginate}
            />
            {currentPosts && currentPosts.map((result) => (
                <article key={result._id} className='postContainer'>
                    <Link to={`/post/${result._id}`}>
                        <h3 className='postTitle'>{result.title}</h3>
                    </Link>
                    <p>{result.post}</p>
                    <div className='postFooter'>
                        <Link key={result.category} to={`/posts/${result.category}`}><div className='postCategory'><b>{result.category}</b></div></Link>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default SearchResults