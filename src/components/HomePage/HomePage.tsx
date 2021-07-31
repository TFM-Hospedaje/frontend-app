import {FC, useEffect, useState} from 'react'
import {logoutUser} from '../../sevices/AuthService'
import {Navbar} from './ui/Navbar/Navbar'
import './homepage.css'
import {ToastProvider} from 'react-toast-notifications'
import {User} from '../../models/models'
import {fetchUserData} from '../../sevices/AuthService'
import { useHistory } from 'react-router-dom'

export const HomePage: FC<any> = (props): JSX.Element => {

    const history = useHistory()

    const [userData, setUserData] = useState<User>({
        _id: '',
        _v: 0,
        email: '',
        username: '',
        password: '',
        active: true,
        code: ''
    })

    useEffect(() => {
        const getUserData = async () => {
            const res = await fetchUserData()
            setUserData(res.data.data)
        }
        getUserData()
    }, [])

    const logout = async () => {
        const res = await logoutUser()
        props.setToken(res.data.data)
        
        
    }
    return(
        <div className="homepage">
            <ToastProvider>
                <Navbar userData = {userData} setToken={props.setToken} setUserData = {setUserData} logout = {logout}/>
            </ToastProvider>
        </div>
    )
}