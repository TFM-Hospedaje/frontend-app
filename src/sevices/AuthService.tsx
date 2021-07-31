import Axios from 'axios'
import LoginInterface, {RegistroInterface,Mail, Search, Booking, Info} from '../models/models'

export const createUser = async (user:RegistroInterface) => {
    const response = await Axios.post('/users/create', user)
    return response
}

export const loginUser = async (user:LoginInterface) => {
    const response = await Axios.post('/users/login', user)
    return response
}

export const checkAuth = async () => {
    const response = await Axios.get('/users/auth')
    return response
}

export const logoutUser = async () => {
    const response = await Axios.get('/users/logout')
    return response
}

export const sendEmail = async (message:Mail) => {
    const response = await Axios.post('/users/sendMessage',message)
    return response
}

export const fetchRooms = async (parameters:Search) => {
    const response = await Axios.post('/bookings/search', parameters)
    return response
}

export const getRoomData = async (id:any) => {
    const response = await Axios.get(`/bookings/room/${id}`)
    return response
}

export const fetchUserData = async () => {
    const response = await Axios.get('/user/data')
    return response
}

export const saveReserva = async (info:Booking) => {
    const response = await Axios.post('/bookings/saveBooking', info)
    return response
}

export const editProfile = async (user:Info) => {
    const response = await Axios.post('/user/editProfile', user)
    return response
}

export const cancelBooking = async (bookingId:string) => {
    const response = await Axios.get(`/user/cancelBooking/${bookingId}`)
    return response
}

export const getBookingsByuserId = async (id:string) => {
    const response = await Axios.get(`/bookings/getBookingsByUserId/${id}`)
    return response
}

export const getBookingById = async (id:string) => {
    const response = await Axios.get(`/bookings/getBookingById/${id}`)
    return response
}

export const deleteAccount = async (id:string) => {
    const response = await Axios.delete(`/user/removeAccount/${id}`)
    return response
}

