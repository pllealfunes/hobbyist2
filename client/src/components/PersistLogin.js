import { Outlet } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePersist from '../hooks/usePersist'
import Loading from '../components/Loading'
import Login from "../pages/Login"
import { toast } from 'react-toastify'
import { refresh } from '../features/auth/authSlice'

const PersistLogin = () => {

    const [persist] = usePersist()
    const dispatch = useDispatch()
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const { user, isLoading, isSuccess } = useSelector(
        (state) => state.auth
    )



}
export default PersistLogin