// Pagination Code from Traversy Media the YouTube video is called Simple Frontend Pagination | React

import Page from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='paginationContainer'>
            {pageNumbers.map(number => (
                <Stack key={number} className='page-item'>
                    <Page onClick={() => paginate(number)} href='!#' count={number} color="warning" variant="outlined">
                        {number}
                    </Page>
                </Stack>
            ))}
        </nav>
    );
};

export default Pagination;
