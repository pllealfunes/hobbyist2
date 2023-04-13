import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import SearchResults from '../components/SearchResults';
import LatestPosts from '../components/LatestPosts';
import CategoryResults from '../components/CategoryResults';
import ErrorMessage from '../components/ErrorMessage';
import axiosPrivate from '../config/interceptor';

/*** MATERIAL UI STYLING ***/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const ExplorePage = () => {
    const categories = ["Physical", "Creative", "Mental", "Food", "Collecting", "Games/Puzzles"]
    const [postsLoaded, setPostsLoaded] = useState()
    const [latestPosts, setLatestPosts] = useState()
    const [showLatestPosts, setShowLatestPosts] = useState(false)
    const [searchResults, setSearchResults] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [categoryResults, setCategoryResults] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response = await axiosPrivate.get('/blog/posts')
                setPostsLoaded(response.data)
                setLatestPosts(response.data.slice(-5))
                setShowLatestPosts(true)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts()
    }, [])


    const searchCategory = (event, category) => {
        event.preventDefault()
        const results = postsLoaded.filter((post) => post.category.includes(category.toLowerCase()));
        if (results.length === 0) {
            setShowErrorMessage(true)
            setShowLatestPosts(false)
            setShowResults(false)
            setShowCategory(false)
        } else {
            reset()
            setShowErrorMessage(false)
            setShowLatestPosts(false)
            setShowResults(false)
            setCategoryResults(results)
            setShowCategory(true)
        }
    }

    const searchForm = (data) => {
        const results = postsLoaded.filter(post => {
            return post.title.toLowerCase().includes(data.search.toLowerCase())
        })

        if (results.length === 0) {
            setShowErrorMessage(true)
            setShowLatestPosts(false)
            setShowResults(false)
            setShowCategory(false)
        } else {
            reset()
            setShowErrorMessage(false)
            setShowLatestPosts(false)
            setShowCategory(false)
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
                    width={700}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    sx={{
                        boxShadow: 2,
                        '& button': { my: 3 },
                    }}
                >
                    <h2 className="searchTitle">Explore page</h2>
                    <Grid
                        className='categoryConatiner'
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        {categories.map((category) => (
                            <button className="categoryBtn" key={category} onClick={(event) => searchCategory(event, category)}>
                                <h3>{category}</h3>
                            </button>
                        ))}
                    </Grid>

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
            {showLatestPosts && <LatestPosts latestPosts={latestPosts} />}
            {showResults && <SearchResults searchResults={searchResults} />}
            {showCategory && <CategoryResults categoryResults={categoryResults} />}
            {showErrorMessage && <ErrorMessage />}

        </section>
    )
}

export default ExplorePage