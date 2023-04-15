import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import SearchResults from '../components/SearchResults';
import LatestPosts from '../components/LatestPosts';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';


/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


const ExplorePage = () => {

    const [postsLoaded, setPostsLoaded] = useState()
    const [latestPosts, setLatestPosts] = useState()
    const [showLatestPosts, setShowLatestPosts] = useState(false)
    const [searchResults, setSearchResults] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/posts`)
                setPostsLoaded(response.data)
                const lastPosts = response.data.slice(-3)
                setLatestPosts(lastPosts.reverse())
                setShowLatestPosts(true)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [])



    const searchForm = (data) => {
        const results = postsLoaded.filter(post => {
            return post.title.toLowerCase().includes(data.search.toLowerCase())
        })

        if (results.length === 0) {
            setShowErrorMessage(true)
            setShowLatestPosts(true)
            setShowResults(false)
        } else {
            reset()
            setShowErrorMessage(false)
            setShowLatestPosts(false)
            setSearchResults(results.reverse())
            setShowResults(true)
        }
    }


    return (
        <section className="searchSection">
            <Box
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                className="searchWrapper"
            >
                <Grid
                    container
                    className="searchContainer"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        boxShadow: 2,
                        '& button': { my: 3 },
                    }}
                    width={700}
                >
                    <h2 className="searchTitle">Explore</h2>

                    <div className="searchFormContainer">
                        <form className="searchForm" onSubmit={handleSubmit(searchForm)}>
                            <label htmlFor="searchBox"></label>
                            {errors.search && <span>Search box cannot be empty when doing a search</span>}
                            <TextField
                                id="searchBox"
                                type='text'
                                label="search bar"
                                name="search"
                                placeholder="Search"
                                fullWidth
                                margin="normal"
                                {...register("search", { required: true })}
                            />
                            <Button className="submitFormBtn" type="submit" variant="contained" color="success" fullWidth>Submit</Button>
                        </form>
                    </div>
                </Grid>
            </Box>
            <div className="resultsContainer">
                {showLatestPosts && <LatestPosts latestPosts={latestPosts} />}
                {showResults && <SearchResults searchResults={searchResults} />}
                {showErrorMessage && <ErrorMessage />}
            </div>
        </section>
    )
}

export default ExplorePage