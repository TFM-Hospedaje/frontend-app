import {FC} from 'react'
import './home.css'
import { Banner } from './Banner/Banner'
import { Login } from './Login/Login'
import {ToastProvider} from 'react-toast-notifications'


export const Home :FC<any> = (props): JSX.Element => {
    return (
    <div className="container">
        <Banner setToken={props.setToken} /> 
        <ToastProvider>
            <Login setToken={props.setToken}/>
        </ToastProvider>
    </div>
    )
    

}