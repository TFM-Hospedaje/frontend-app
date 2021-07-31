import {FC, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Booking, Info} from '../../models/models'
import {useToasts} from 'react-toast-notifications'
import {editProfile,getBookingsByuserId,getBookingById, cancelBooking, deleteAccount} from '../../sevices/AuthService'
import './profile.css'
import Modal from 'react-modal'

export const Profile: FC<any> = (props):JSX.Element => {

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

      const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)

      const [removeModalIsOpen, setRemoveModalIsOpen] = useState<boolean>(false)

      const [editBooking, setEditBooking] = useState<Booking>()

      const openEditModal = async (id:any) => {
        const res = await getBookingById(id)
        if(res.data.code === 200) {
            setEditBooking(res.data.data)
            setEditModalIsOpen(true)
        } 
      }

      const openRemoveModal = async (id:any) => {
            setRemoveModalIsOpen(true)
        }

      const closeEditModal = () => {
          setEditModalIsOpen(false)
      }

      const closeRemoveModal = () => {
        setRemoveModalIsOpen(false)
    }

    const {addToast} = useToasts()

    const history = useHistory()

    const [info, setInfo] = useState<Boolean>(true)

    const [handleChange, setHandleChange] = useState<Boolean>(true)

    const [profile, setProfile] = useState<Boolean>(false)

    const [editInfo, setEditInfo] = useState<Info>({
        _id: props.userData._id,
        username: props.userData.username,
        password: '',
        repeatPassword: ''
    })

    const [bookings, setBookings] = useState<Boolean>(false)

    const [books, setBooks] = useState<Booking[]>([])

    useEffect(() => {
        const fetchUserBookings = async () => {
            const res = await getBookingsByuserId(editInfo._id)
            if(res.data.code === 200) {
                setBooks(res.data.data)
            } else {
                history.push('/')
            }
        }
        fetchUserBookings()
        setInfo(true)
        setProfile(false)
        setBookings(false)
    }, [handleChange])

    const handleInfo = () => {
        setProfile(false)
        setBookings(false)
        setInfo(true)
    }

    const handleProfile = () => {
        setInfo(false)
        setBookings(false)
        setProfile(true)
    }

    const handleBookings = () => {
        setInfo(false)
        setProfile(false)
        setBookings(true)
    }

    const saveProfile = async () => {
        if(editInfo.username === '' || editInfo.password === '' || editInfo.repeatPassword === '') {
            addToast('Rellena los campos obligatorios', {
                appearance: 'error',
                autoDismiss: true
            })
        } else {
            if(editInfo.password !== editInfo.repeatPassword) {
                addToast('Las contraseñas no coinciden', {
                    appearance: 'error',
                    autoDismiss: true
                })
            } else {
                const res = await editProfile(editInfo)
                if(res.data.code === 200) {
                    props.setUserData({...props.userData,username: editInfo.username})
                    addToast(res.data.data, {
                       appearance: 'success',
                       autoDismiss: true  
                    })
                } else {
                    addToast(res.data.data, {
                        appearance: 'error',
                        autoDismiss: true
                    })
                }

            }
        }
    }

    const anularReserva = async(id:any) => {
        try {
            const res = await cancelBooking(id)
            if(res.data.code !== 200) {
                addToast(res.data.data, {
                    appearance: 'error',
                    autoDismiss: true
                })
            } else {
                setHandleChange(!handleChange)
                closeEditModal()
                addToast(res.data.data, {
                    appearance: 'success',
                    autoDismiss: true
                })
            }

        } catch(err) {
            addToast('Unable to connect', {
                autoDismiss: true,
                appearance: 'error'
            })
        }
    }

    const removeAccount = async(id:any) => {
        try {
           const res = await deleteAccount(id)
           if(res.data.code === 200) {
                props.setToken(res.data.data)
           } else {
            addToast(res.data.data, {
                appearance: 'error',
                autoDismiss: true
            })
           }

        } catch(err) {
            addToast('Unable to connect', {
                appearance: 'error',
                autoDismiss: true
            })
        }
    }

    return (
        <div className="profile__container">
            <Modal
            isOpen={editModalIsOpen}
            onRequestClose={closeEditModal}
            style={customStyles}
            contentLabel="Edit Modal"
            >
                <div className="editbooking__wrapper">
                    <div className="editbooking__header">
                        <h2 className="title__editbooking">Anular booking</h2>
                        <h3 className="close__editbooking" onClick={closeEditModal}>X</h3>
                    </div>
                    <div className="editbooking__container">
                        <span className="title__editbooking__info">¿Está seguro de que desea anular la reserva?</span>
                        <div className="editbooking__info">
                            <span><small>Esta operación será irreversible</small></span>
                        <div className="header__section">
                    </div>    
                  
                        </div>
                    </div>
                    <div className="editbooking__footer">
                        <button  className="editbooking__button" onClick={() => anularReserva(editBooking?._id)}>Anular</button>
                    </div>
                    
                </div>

            </Modal>
            <Modal
            isOpen={removeModalIsOpen}
            onRequestClose={closeRemoveModal}
            style={customStyles}
            contentLabel="Remove Modal"
            >
                <div className="editbooking__wrapper">
                    <div className="editbooking__header">
                        <h2 className="title__editbooking">Eliminar cuenta</h2>
                        <h3 className="close__editbooking" onClick={closeRemoveModal}>X</h3>
                    </div>
                    <div className="editbooking__container">
                        <span className="title__editbooking__info">¿Está seguro de que desea eliminar la cuenta?</span>
                        <div className="editbooking__info">
                            <span><small>Esta operación será irreversible</small></span>
                        <div className="header__section">
                    </div>    
                  
                        </div>
                    </div>
                    <div className="editbooking__footer">
                        <button  className="editbooking__button" onClick={() => removeAccount(editInfo?._id)}>Eliminar</button>
                    </div>
                    
                </div>

            </Modal>
            <div className="profile__container--asidebar">
                <span className="asidebar__buttons" onClick={handleProfile}>Editar Perfil</span>
                <span className="asidebar__buttons" onClick={handleBookings}>Reservas</span>
                <span className="asidebar__buttons" style={{backgroundColor: 'lightcoral'}} onClick={openRemoveModal}>Eliminar cuenta</span>
            </div>
            <div className="profile__container--content">
                {profile?
                <div className="profile__container--content__info">
                    <div className="header__section">
                        <h3>EDITAR PERFIL</h3><span className="editprofile__button" onClick={saveProfile}>Guardar</span>    
                    </div>
                    <div className="input-group">
                        <input value={editInfo._id} readOnly className="form-control" type="text" name="id" id="id" autoComplete="off" placeholder="Password"/>
                            <label >ID</label>
                    </div>
                    <div className="input-group">
                        <input value={editInfo.username} onChange={(e) => setEditInfo({...editInfo,username:e.target.value})} className="form-control" type="text" name="username" id="username" autoComplete="off" placeholder="Password"/>
                            <label >Nombre de usuario</label>
                            {editInfo.username===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}  
                    </div>
                    <div className="input-group">
                        <input value={editInfo.password} onChange={(e) => setEditInfo({...editInfo,password:e.target.value})} className="form-control" type="password" name="password" id="password" autoComplete="off" placeholder="Password"/>
                            <label >Nueva Contraseña</label>
                            {editInfo.password===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}  
                    </div>
                    <div className="input-group">
                        <input value={editInfo.repeatPassword} onChange={(e) => setEditInfo({...editInfo,repeatPassword:e.target.value})} className="form-control" type="password" name="repeatPassword" id="repeatPassword" autoComplete="off" placeholder="Password"/>
                            <label >Repetir Contraseña</label>
                            {editInfo.repeatPassword===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}  
                    </div>
                </div> 
                :
                false
                }
                {bookings?
                <div className="profile__container--content__info">
                    <div className="header__section">
                        <h3>RESERVAS</h3>
                    </div>

                    {books.length > 0?
                        books.map((book:Booking) => <div className="book__row" key={book.idUsuario + book.idRoom}>
                                                        <div className="book__row--inside">
                                                            <span>Habitación: {book.idRoom === '6065916db5fc9f341f7d71fa'?
                                                            'Las Letras'
                                                            :
                                                            book.idRoom === '606594d16683142cf08777e4'?
                                                            'Las Estelas'
                                                            :
                                                            book.idRoom === '6065c0946683142cf08777e5'?
                                                            'El arco'
                                                            :
                                                            'Vintage'}</span>
                                                            <span>Fecha de entrada: {book.dateI}</span>
                                                            <span>Fecha de salida: {book.dateF}</span>
                                                        </div>
                                                        <div className="book__row--buttons">
                                                            <span onClick={() => openEditModal(book._id)}>ANULAR</span>
                                                        </div>
                                                    </div>)
                                                    :
                                                    <span>No tienes reservas programadas</span>}    
                    
                </div>

                :
                false
                }
            </div>
        </div>
    )
}