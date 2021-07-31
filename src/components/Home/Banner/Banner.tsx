import {FC} from 'react'
import './banner.css'

export const Banner: FC<any> = (props):JSX.Element => {

    const logInvited = () => {
        props.setToken(true)
        localStorage.setItem("invited", 'true')
    }

    return (
        <div className="wrapperB">
            <div className="mask">
                <div className="banner">
                    <h1>Hospedaje Menéndez Pelayo</h1>
                </div>

                <div className="options">
                    <button className="button" onClick={logInvited}><span>Descubre más</span></button>
                    <span><a href="" /></span>
                </div>
            </div>
        </div>
    )
}