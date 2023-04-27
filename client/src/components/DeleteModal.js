import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '5px solid #000',
    boxShadow: 24,
    p: 4,
    borderColor: '#FFBF86',
    borderRadius: '16px'
};

const DeleteModal = ({ deleteId, deleteFunction, message }) => {



    return (
        <div
            className="commentModal"
            aria-labelledby="delete-modal-question"
            aria-describedby="delete-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-question" variant="h6" component="h2">
                    {message}
                </Typography>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <button className="deleteModalBtn" type="button" onClick={() => deleteFunction(deleteId, false)}>Cancel</button>
                    <button className="deleteModalBtn" onClick={() => deleteFunction(deleteId, true)}>Delete</button>
                </Grid>
            </Box>
        </div>
    )
}

export default DeleteModal