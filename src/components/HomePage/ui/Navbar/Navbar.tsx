import {FC, useState} from 'react'
import './navbar.css'
import {Route,NavLink,Switch, BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom'
import {Main} from '../../../Main/Main'
import {About} from '../../../About/About'
import {Contact} from '../../../Contact/Contact'
import {Bookings} from '../../../Bookings/Bookings'
import {Profile} from '../../../Profile/Profile'
import {FaUserAlt} from 'react-icons/fa'
import {AiOutlineLogout as FaAndroid} from 'react-icons/ai'
import { Room } from '../../../Bookings/Room/Room'
import {Search} from '../../../../models/models'




export const Navbar: FC<any> = (props):JSX.Element => {


    const[search,setSearch] = useState<Search>({
        fechaIni: '',
        fechaFin: '',
        personas: 0,
        banos: 'indiferente'
    })

    const goLogin = () => {
        window.location.reload()
    }

    return (
        <div className="nav__wrapper">
            <Router>
                <div className="header">
                    <NavLink className="link" exact to="/">Home</NavLink>

                    <NavLink className="link"  exact to="/about">Sobre nosotros</NavLink>
                        
                    <NavLink className="link"  exact to="/bookings">Reserva</NavLink>
                    
                    <NavLink className="link" exact to="/contact">Contáctanos</NavLink>

                    {localStorage.getItem("invited") === 'true'?
                    <NavLink className="link" onClick={goLogin} exact to="">Log / Registro</NavLink>
                    :
                    <NavLink className="link" exact to="/profile"><FaUserAlt size="20px" /></NavLink>
                    }
                    
                    {localStorage.getItem("invited") === 'true'?
                    false
                    :
                    <FaAndroid size="20px" className="logout" onClick={() => props.logout()} />
                    }
                </div>
                <hr/>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route exact path="/about">
                        <About />
                    </Route>

                    <Route exact path="/contact">
                        <Contact />
                    </Route>

                    <Route exact path="/profile">
                        <Profile userData={props.userData} setUserData={props.setUserData} setToken={props.setToken}  />
                    </Route>

                    <Route exact path="/bookings">
                        <Bookings search={search} setSearch={setSearch}/>
                    </Route>

                    <Route exact path="/bookings/:id">
                        <Room search={search} userData={props.userData} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}