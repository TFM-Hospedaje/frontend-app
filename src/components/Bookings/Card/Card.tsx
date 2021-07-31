import {FC} from 'react'
import './card.css'
import lasEstelas from '../../../assets/images/rooms/lasEstelas.jpg'
import elArco from '../../../assets/images/rooms/elArco.jpg'
import Vintage from '../../../assets/images/rooms/vintage.jpg'
import lasLetras from '../../../assets/images/rooms/lasLetras.jpg'
import {
    NavLink,
} from 'react-router-dom'

export const Card:FC<any> = (props):JSX.Element => {
    return (
        <div className="card">
            {props.info.name === 'Las Estelas'
            ?
            <img alt="estelas" src={lasEstelas} width={125} height={125} />
            :
            props.info.name === 'El Arco'
            ?
            <img alt="arco" src={elArco} width={125} height={125} />
            :
            props.info.name === 'Las Letras'
            ?
            <img alt="letras" src={lasLetras} width={125} height={125} />
            :
            <img alt="vintage" src={Vintage} width={125} height={125} />
            }
            <p>{props.info.name}</p>
            <NavLink className="link" exact to={'/bookings/' + props.info._id}><button className="card__button">Ver más</button></NavLink>
        </div>
    )
}