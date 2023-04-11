import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import SearchResults from '../components/SearchResults';
import LatestPosts from '../components/LatestPosts';
import CategoryResults from '../components/CategoryResults';
import ErrorMessage from '../components/ErrorMessage';
import axiosPrivate from '../config/interceptor';



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
        <div className="container">
            <h1>Explore page</h1>
            <div className='categoryConatiner'>
                {categories.map((category) => (
                    <button className="categoryBtn" key={category} onClick={(event) => searchCategory(event, category)}>
                        <h3>{category}</h3>
                    </button>
                ))}
            </div>
            <section className="searchSection">
                <div className="searchFormContainer">
                    <form className="searchForm" onSubmit={handleSubmit(searchForm)}>
                        <label htmlFor="searchBox"></label>
                        {errors.search && <span>Search box cannot be empty when doing a search</span>}
                        <input
                            id="searchBox"
                            name="search"
                            placeholder="Search"
                            {...register("search", { required: true })}
                        />
                        <button className="submitCommBtn" type="submit">Submit</button>
                    </form>
                    {showLatestPosts && <LatestPosts latestPosts={latestPosts} />}
                    {showResults && <SearchResults searchResults={searchResults} />}
                    {showCategory && <CategoryResults categoryResults={categoryResults} />}
                    {showErrorMessage && <ErrorMessage />}
                </div>
            </section>
        </div>
    )
}

export default ExplorePage