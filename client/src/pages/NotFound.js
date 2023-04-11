import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <div className="container">
            <p>I'm sorry but the page you are lookking for can't be found. Click the link below to return to the homepage</p>
            <div><Link to="/">Home</Link></div>
        </div>
    )
}

export default NotFound