import { FC, useEffect, useState} from "react";
import { useHistory, useParams } from "react-router";
import {getRoomData, saveReserva} from '../../../sevices/AuthService'
import {Room as RoomInterface, Booking} from '../../../models/models'
import {useToasts} from 'react-toast-notifications'
import './room.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { BsFillPeopleFill,BsWifi } from "react-icons/bs";
import {BiWifiOff} from 'react-icons/bi'
import {FaBed,FaBath} from 'react-icons/fa'
import {GiCigarette} from 'react-icons/gi'
import {IoLogoNoSmoking} from 'react-icons/io'
import Modal from 'react-modal'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '80%',
      backgroundColor       : 'white',
      border                : '1px solid rgb(0, 155, 125) '
    }
  }

export const Room:FC<any> = (props):JSX.Element => {

    const {id} = useParams<any>()

    const {addToast} = useToasts()

    const [modalIsOpen,setIsOpen] = useState(false);

    const[roomData, setRoomData] = useState<RoomInterface>({
        name: '',
        people: 0,
        beds: 0,
        bathroom: '',
        network: false,
        smokers: false,
        prize: 0,
        photos: ['']
    })

    const [modal, setModal] = useState({
        nombre: '',
        apellidos: '',
        telefono: ''
    })

    useEffect(() => {
        const fetchRoomData = async() => {
            const response = await getRoomData(id)
            setRoomData(response.data.data)
        }
        fetchRoomData()
    }, [id])

    const history = useHistory()

    const goBack = () => {
        history.push("/bookings")
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const daysBetweenDates = () => {
        const date1 = new Date(props.search.fechaIni)
        const date2 = new Date(props.search.fechaFin)
        let dif = date2.getTime() - date1.getTime()

        return Math.ceil(dif / (1000 * 3600 * 24))
    }

    const saveBooking = async () => {
        if(modal.nombre === '') {
            addToast('El campo nombre es obligatorio',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(modal.apellidos === '') {
            addToast('El campo apellidos es obligatorio',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(modal.telefono === '') {
            addToast('El campo teléfono es obligatorio',{
                appearance: 'error',
                autoDismiss:true
            })
        } else {
            const reserva: Booking = {
                _id: 'id',///////////////////////////
                fechaInicio: props.search.fechaIni,
                fechaFin: props.search.fechaFin,
                idUsuario: props.userData._id,
                idRoom: id,
                user: {...modal,email: props.userData.email}
            } 
            const response = await saveReserva(reserva)
            if(response.data.code === 500) {
                addToast(response.data.data,{
                    appearance: 'error',
                    autoDismiss:true
                })
            } else {
                setModal({
                    nombre: '',
                    apellidos: '',
                    telefono: ''
                })
                closeModal()

                addToast(response.data.data,{
                    appearance: 'success',
                    autoDismiss:true
                })
            }
        }
    }

    return (
        <div className="room__wrapper">
            <div className="room__header">
                <h1 className="title">Habitación {roomData.name}</h1><button onClick={openModal} className="reserva__room">Reserva YA!</button><h3 onClick={goBack}  className="reload"><AiOutlineArrowLeft size="40px" /></h3>
            </div>
            <div className="room__container">
                <div className="room__photos">
                    Cargando imágenes...
                </div>
                <div className="room__info">
                    <span className="desc">La Habitación {roomData.name} será el lugar ideal para tu estancia en Santander. Sin duda, su cuidado diseño interior, además de amplitud, mejorará la calidad de tus vacaciones. No dudes más y reserva ya!</span>
                    <span className="title__info">Información general</span>
                    <div className="general__info">
                        <div className="g__row">
                            <span>{roomData.people} <BsFillPeopleFill size="20px"/></span>
                            <span>{roomData.beds} <FaBed size="20px" /></span>
                            <span>{roomData.bathroom === 'shared'? 'C' : 'I'} <FaBath size="20px" /></span>
                        </div>

                        <div className="g__row">
                            <span>{roomData.smokers? <GiCigarette size="20px" /> : <IoLogoNoSmoking size="20px" />}</span>
                            <span>{roomData.prize} € </span>
                            <span>{roomData.network? <BsWifi size="20px" /> : <BiWifiOff size="20px" />}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            > 
                <div className="modal__wrapper">
                    <div className="modal__header">
                        <h2 className="title__modal">Estás a un paso de completar tu reserva!</h2>
                        <h3 className="close__modal" onClick={closeModal}>X</h3>
                    </div>
                    <div className="modal__container">
                        <span className="title__modal__info">Información de la reserva</span>
                        <div className="modal__info">
                            <div className="reserva__info">
                                <span className="row__span">Fecha entrada: {props.search.fechaIni}</span>
                                <span className="row__span">Fecha salida: {props.search.fechaFin}</span>
                                <span className="row__span">Días: {daysBetweenDates()}</span>
                                <span className="row__span">Personas: {props.search.personas}</span>
                                <span className="row__span">Precio por noche: {roomData.prize}</span>
                                <span className="row__span">Importe total: {daysBetweenDates() * roomData.prize} €</span>
                            </div>
                            <div className="user__info">
                                <div className="row__userinfo">
                                    <span className="row__span">Username</span><span>{props.userData.username}</span>
                                </div>
                                <div className="row__userinfo">
                                    <span className="row__span">Email</span><span>{props.userData.email}</span>
                                </div>
                                <div className="row__userinfo">
                                    <span className="row__span">Nombre</span><input className="reserva__input" value={modal.nombre} onChange={(e) => setModal({...modal,nombre:e.target.value})}/>
                                </div>
                                <div className="row__userinfo">
                                    <span className="row__span">Apellidos</span><input className="reserva__input" value={modal.apellidos} onChange={(e) => setModal({...modal,apellidos:e.target.value})}/>
                                </div>
                                <div className="row__userinfo">
                                    <span className="row__span">Teléfono</span><input className="reserva__input" value={modal.telefono} onChange={(e) => setModal({...modal,telefono:e.target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal__footer">
                        <button onClick={saveBooking} className="modal__button">Reservar</button>
                    </div>
                    
                </div>
            </Modal>

        </div>
    )
}