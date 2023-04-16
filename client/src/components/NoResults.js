import {
    Box,
    Grid,
    Typography
} from "@mui/material";



const NoResults = () => {
    return (
        <Box
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="searchWrapper"
        >
            <Grid
                container
                className="Container"
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4" gutterBottom>No Posts to Display</Typography>
                <Typography variant="subtitle1" gutterBottom>Unable to Find Matching Posts</Typography>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <img className="feedPhoto" src="../images/Search-cuate.png" alt="Search" />
                <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            </Grid>
        </Box >
    )
}

export default NoResults