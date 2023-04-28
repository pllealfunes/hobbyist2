import { Link } from 'react-router-dom'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Box

} from "@mui/material";

const NotFound = () => {

    return (
        <div className="container">
            <section className='emptyPostsWrapper'>
                <Grid
                    container
                    className="emptyPostsContainer"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        boxShadow: 2,
                        '& button': { my: 3 },
                    }}
                    width={700}
                >
                    <Typography variant="h5">OOPS! Something Went Wrong</Typography>
                    <Typography variant="subtitle1">I'm sorry but the page you are looking for can't be found</Typography>
                </Grid>
            </section>
        </div>
    )
}

export default NotFound