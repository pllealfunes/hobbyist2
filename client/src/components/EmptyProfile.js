import {
    Box,
    Grid,
    Typography
} from "@mui/material";



const EmptyProfile = ({ userProfile }) => {
    return (
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
                <Typography variant="h5">Welcome to {userProfile.username}'s Profile</Typography>
                <Typography variant="subtitle1">Stay Tuned for Future Posts</Typography>
            </Grid>
        </section>
    )
}

export default EmptyProfile