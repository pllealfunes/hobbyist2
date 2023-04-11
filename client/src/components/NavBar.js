import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Hobbyist</h1>
                </Link>
                <Link to="/createNewPost">
                    <h1>New Post</h1>
                </Link>
                <Link to="/explore">
                    <h1>Explore</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar