import {FC} from 'react'
import './confirm.css'
import logo from '../../../../assets/images/descarga.png'


export const ConfirmMail:FC = () => {
    return(
        <div className="confirmation">
            <img src={logo} width="50" alt=""/>
            <p>Hemos mandando un E-mail de confirmación de cuenta a tu correo electrónico!.</p>
            <p>Si no has recibido nada, <strong>Pulsa aquí</strong> para volver a enviar el email.</p>
        </div>
    )
}