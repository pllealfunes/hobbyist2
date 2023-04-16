import {
    Box,
    Grid,
    Typography
} from "@mui/material";



const EmptyProfile = () => {
    return (
        <Box
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4" gutterBottom>No Posts to Display</Typography>
                <Typography variant="subtitle1" gutterBottom>Create a New Post to See It Here</Typography>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <img className="emptyPhoto" src="../images/Typing-cuate.png" alt="Write Blogs about hobbies" />
                <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            </Grid>
        </Box >
    )
}

export default EmptyProfile