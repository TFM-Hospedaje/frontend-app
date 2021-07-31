import {FC} from 'react'
import './about.css'

export const About: FC = () => {
    return (
        <div className="about__wrapper">
            <h1 className="title">About us</h1>
            <div className="about__container">
                <div className="about__text">
                    <p className="txtanim">Si estás pensando en reservar alojamiento, estás en la página correcta; descansa y disfruta a la vez.

                    El Hospedaje Menéndez Pelayo es un alojamiento con encanto que ofrece varios tipos de habitaciones, desde la estándar hasta la tipo Junior Suite.</p>

                    <p>Disfruta de una experiencia auténtica, gracias a la hospitalidad de nuestros empleados. El lugar perfecto donde dormir en Santander.

                    Nuestro alojamiento garantiza que su viaje o sus vacaciones sean todo un éxito.</p>
                </div>

                <a className="about__image" target="_blank" href="https://www.google.com/maps/place/Hospedaje+Menendez+Pelayo/@43.4622865,-3.8140638,17z/data=!3m1!4b1!4m10!3m9!1s0xd494bf8292bd2c7:0x94af804a6948da28!5m4!1s2021-04-21!2i3!4m1!1i2!8m2!3d43.4622865!4d-3.8118751">
   
                </a>
            </div>
        </div>
    )
}