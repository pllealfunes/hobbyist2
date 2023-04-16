import {
    Box,
    Grid,
    Typography
} from "@mui/material";



const EmptyFeed = () => {
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
                <Typography variant="subtitle1" gutterBottom>Follow Users & Categories to Fill your Feed</Typography>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <img className="feedPhoto" src="../images/Taking-notes-rafiki.png" alt="Search" />
                <a href="https://storyset.com/work">Work illustrations by Storyset</a>
            </Grid>
        </Box >
    )
}

export default EmptyFeed