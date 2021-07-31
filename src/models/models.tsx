export default interface LoginInterface {
    username: string;
    password: string;
}

export interface RegistroInterface {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
}

export interface Mail {
    name: string,
    email: string,
    message: string
}

export interface Search {
    fechaIni: string,
    fechaFin: string,
    personas: number,
    banos: string
}

export interface Room {
    name: string,
    people: number,
    beds: number,
    bathroom: string,
    network: boolean,
    smokers: boolean,
    prize: number,
    photos: [string]
}

export interface User {
    _id: string,
    _v: number,
    email: string,
    username: string,
    password: string,
    active: boolean,
    code: string
}

export interface Booking {
    _id?: string,
    fechaInicio: string,
    fechaFin: string,
    dateI?:string,
    dateF?:string,
    idUser?:string,
    idUsuario: string,
    idRoom: string,
    user: {
        nombre: string,
        apellidos: string,
        telefono: string,
        email: string
    }
}

export interface Info {
    _id: string,
    username: string,
    password: string,
    repeatPassword?: string
}
