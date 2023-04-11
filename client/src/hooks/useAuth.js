import { useSelector } from 'react-redux'
import { user } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    /*const token = useSelector(user)

    if (token) {
        const decoded = jwtDecode(token)
        const { currentUser } = decoded._id

        return { currentUser }
    }

    return { currentUser: '' }*/
}
export default useAuth