// Pagination Code from Traversy Media the YouTube video is called Simple Frontend Pagination | React

import Page from '@mui/material/Pagination';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];



    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Page className="paginationBar" onChange={(event, value) => paginate(value)} count={pageNumbers.length} color="warning" variant="outlined" />
    );
};

export default Pagination;
