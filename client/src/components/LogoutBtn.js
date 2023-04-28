import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout, reset } from '../features/auth/authSlice'




export default function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const logoutUser = async () => {
        try {
            await dispatch(logout()).unwrap()
            toast.success('You are logged out')
            navigate('/')
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <button className="logoutBtn" onClick={logoutUser}>Logout</button>
    )
}
