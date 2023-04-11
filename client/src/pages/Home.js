/** MUI STYLING **/
import {
    Box,
    Container,
    Button,
    Grid,
    List,
    ListItemText,
    Typography
} from "@mui/material";

const Home = () => {


    return (
        <section className="homeContainer">
            <Box
                sx={{
                    py: 30,
                    px: 12,
                }}
                className="heroSection"
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    color="common.white"
                >
                    <Typography variant="h2" component="h2" gutterBottom={true}>
                        <Typography variant="h2" component="span">Hobbyist</Typography>
                    </Typography>
                    <Typography variant="subtitle1" paragraph={true}>Blog, Explore, and Discoer New Passions</Typography>
                </Grid>
            </Box>


        </section >
    )
}

export default Home