import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import SearchResults from '../components/SearchResults';
import LatestPosts from '../components/LatestPosts';
import CategoryResults from '../components/CategoryResults';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';


/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import NoResults from '../components/NoResults';
import { Typography } from '@mui/material';


const ExplorePage = () => {


    const [postsLoaded, setPostsLoaded] = useState([])
    const [latestPosts, setLatestPosts] = useState([])
    const [showLatestPosts, setShowLatestPosts] = useState(false)
    const [searchResults, setSearchResults] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [categoryResults, setCategoryResults] = useState('')
    const [showEmptyResults, setShowEmptyResults] = useState(false)

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_URL}/api/blog/posts`)
                setPostsLoaded(response.data)
                const lastPosts = response.data.slice(-8)
                setLatestPosts(lastPosts.reverse())
                setShowLatestPosts(true)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [])


    const searchForm = (data) => {
        const { search, category } = data
        let categoryArray
        let searchArray
        let lowercaseSearch = search.toLowerCase()
        let lowercaseCategory = category.toLowerCase()
        let results


        if (category && search) {

            searchArray = postsLoaded.filter((post) => post.title.toLowerCase().includes(lowercaseSearch));
            categoryArray = searchArray.filter((post) => post.category.includes(lowercaseCategory));

            if (lowercaseCategory !== "all" && categoryArray.length > 0) {
                results = categoryArray
            }

            else if (lowercaseCategory === "all") {
                searchArray = postsLoaded.filter((post) => post.title.toLowerCase().includes(lowercaseSearch));
                results = searchArray
            }
            else {
                results = []
            }

        }
        else if (category && search === "") {

            if (lowercaseCategory === "all") {
                results = postsLoaded
            } else {
                categoryArray = postsLoaded.filter((post) => post.category.includes(lowercaseCategory));

                results = categoryArray
            }

        } else if (search && category === "") {

            searchArray = postsLoaded.filter((post) => post.title.toLowerCase().includes(lowercaseSearch));

            results = searchArray
        } else {
            results = []
        }


        if (results.length === 0) {
            setShowEmptyResults(true)
            setShowLatestPosts(false)
            setShowResults(false)
            setShowCategory(false)
        } else {
            setShowEmptyResults(false)
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
                        '& button': { my: 3 }
                    }}
                >
                    <div className='searchTitle'>
                        <Typography variant="h4" className="searchTitle">Explore</Typography>
                        <Typography variant='subtitle1'>By Search, Category, or Both</Typography>
                    </div>

                    <form className="searchForm" onSubmit={handleSubmit(searchForm)}>

                        <TextField
                            id="searchBox"
                            type="text"
                            label="Search"
                            name="search"
                            fullWidth
                            {...register('search')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon aria-label="search magnify glass" edge="end" />
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                my: 2
                            }}
                        />


                        <FormControl fullWidth>
                            <InputLabel id="categorySelect" htmlFor="category" >Category...</InputLabel>
                            <Select
                                label="Category"
                                labelId='categorySelect'
                                name="category"
                                className="category"
                                variant="outlined"
                                value={watch("category") || ""}
                                {...register("category")}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="physical">Physical</MenuItem>
                                <MenuItem value="creative">Creative</MenuItem>
                                <MenuItem value="mental">Mental</MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="musical">Musical</MenuItem>
                                <MenuItem value="collecting">Collecting</MenuItem>
                                <MenuItem value="games+puzzles">Games+Puzzles</MenuItem>
                            </Select>
                        </FormControl>

                        <button className="submitFormBtn" type="submit">Submit</button>
                    </form>

                </Grid>
            </Box>
            <Grid
                container
                display="flex"
                direction="column"
                alignItems="flex-start"
                justifyContent="center"
                sx={{
                    m: 3
                }}
            >
                <Typography variant='h5'>Latest Posts</Typography>
            </Grid>
            <Grid>
                <div className="resultsContainer">
                    {showLatestPosts && <LatestPosts latestPosts={latestPosts} />}
                    {showResults && <SearchResults searchResults={searchResults} />}
                    {showEmptyResults && <section className='emptyPostsWrapper'>
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
                            <Typography variant="h5">No Posts to Display</Typography>
                            <Typography variant="subtitle1">Try a New Search</Typography>
                        </Grid>
                    </section>}
                </div>
            </Grid>
        </section>
    )
}

export default ExplorePage