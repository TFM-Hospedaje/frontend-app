import {FC, useState} from 'react'
import './bookings.css'
import {useToasts} from 'react-toast-notifications'
import {Room} from '../../models/models'
import { fetchRooms } from '../../sevices/AuthService'
import {Card} from './Card/Card'


export const Bookings:FC<any> = (props):JSX.Element => {

    const {addToast} = useToasts()

    const clearSearch = () => {
        props.setSearch({
            fechaIni: '',
            fechaFin: '',
            personas: 0,
            banos: 'indiferente'
        })
        setClick(0)
    }

    const[click, setClick] = useState(0)

    const[busqueda,setBusqueda] = useState(false)

    const[rooms,setRooms] = useState<Room[]>([])

    const searchRooms = async () => {
        setRooms([])
        if(props.search.fechaIni === '') {
            addToast('El campo fecha de entrada es requerido',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(props.search.fechaFin === '') {
            addToast('El campo fecha de salida es requerido',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(new Date(props.search.fechaFin) <= new Date(props.search.fechaIni)) {
            addToast('La fecha de salida ha de ser mayor que la de entrada',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(props.search.personas <= 0) {
            addToast('Introduce un número de personas válido',{
                appearance: 'error',
                autoDismiss:true
            })
        } else {
            setClick(click + 1)
            setBusqueda(true)
            const response = await fetchRooms(props.search)
            let {data} = response.data
            setRooms(data)
            
        }
        
    }

    return (
        <div className="bookings__wrapper">
            <div className="bookings__header">
                <h1 className="title">Bookings</h1><h3 onClick={clearSearch} className="reload">X</h3>
            </div>
            {localStorage.getItem("invited") === 'true'?
                    <div className="bookings__container">
                        <span>Entra con tu cuenta o regístrate para acceder a nuestro proceso de reservas</span>
                    </div>
                    :
                    <div className="bookings__container">
                    <div className="bookings__ls">
                        <div className="form-row">
                            <label> Fecha de entrada: </label>
                            <input className="datepicker" type="date" value={props.search.fechaIni} onChange={(e) => props.setSearch({...props.search,fechaIni:e.target.value})}/>
                        </div>
    
                        <div className="form-row">
                            <label> Fecha de salida: </label>
                            <input className="datepicker" type="date" value={props.search.fechaFin} onChange={(e) => props.setSearch({...props.search,fechaFin:e.target.value})}/>
                        </div>
                        
                        <div className="form-row">
                            <label> Personas: </label>
                            <input className="datepicker people" type="number" value={props.search.personas} onChange={(e) => props.setSearch({...props.search,personas:parseInt(e.target.value)})}/>
                        </div>
    
                        <div className="form-row">
                            <label> Baño: </label>
                            <select className="datepicker" value={props.search.banos} onChange={(e) => props.setSearch({...props.search,banos:e.target.value})}>
                                <option value="indiferente" defaultValue="indiferente">Indiferente</option>
                                <option value="individual">Individual</option>
                                <option value="shared">Compartido</option>
                            </select>
                        </div>
    
                        <div onClick={searchRooms} className="buttonsend btnbooking">
                            <div className="buttonse buttonse-one">
                                <span>BUSCAR</span>
                            </div>
                        </div>
                        
                    </div>
    
                    <div className="bookings__rs">
                        {rooms.length === 0 && busqueda && click > 0
                        ?
                        <h3 className="text__rs">¡Ops, no hemos encontrado coindicencias con tus criterios de búsqueda!</h3>
                        :
                        rooms.map(room => <Card key={room.name} info={room}/>)        
                        }
                        {rooms.length === 0 && !busqueda && click === 0
                        ?
                        <h2 className="text__rs">¡Consulta nuestras habitaciones disponibles!</h2>
                        :
                        false
                        }
                    </div>
                </div>

                }
            
        </div>
    )
}