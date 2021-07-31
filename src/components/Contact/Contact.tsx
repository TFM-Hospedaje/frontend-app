import {FC, useState} from 'react'
import './contact.css'
import {AiOutlineWhatsApp,AiOutlinePhone,AiOutlineMail} from 'react-icons/ai'
import {useToasts} from 'react-toast-notifications'
import {sendEmail} from '../../sevices/AuthService'
import {Mail} from '../../models/models'

export const Contact: FC = () => {

    const {addToast} = useToasts()

    const [message, setMessage] = useState<Mail>({
        name: '',
        email: '',
        message: ''
    })

    const sendMessage = async () => {
        if(message.name === '') {
            addToast('El campo nombre es obligatorio',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(message.email === '') {
            addToast('El campo email es obligatorio',{
                appearance: 'error',
                autoDismiss:true
            })
        } else if(message.message === ''){
            addToast('El campo mensaje es obligatorio',{
                appearance: 'error',
                autoDismiss:true
            })
        } else {
            const response = await sendEmail(message)
            if(response.data.code === 500) {
                addToast(response.data.data,{
                    appearance: 'error',
                    autoDismiss:true
                })
            } else {
                addToast(response.data.data,{
                    appearance: 'success',
                    autoDismiss:true
                })
                setMessage({
                    name: '',
                    email: '',
                    message:''
                })
            }     
        }
        
    }

    return (
        <div className="contact__wrapper">
            <h1 className="title">Contact</h1>
            <div className="contact__container">
                <div className="contact__phone">
                    <h2 className="phone">942 123 456 <AiOutlinePhone/></h2>
                    <h2 className="phone">683 483 324 <AiOutlineWhatsApp/></h2>
                    <h3 className="phone">hospedajemenendezpelayo@gmail.com <AiOutlineMail/></h3>
                </div>

                <div className="contact__mail">
                    <label>Nombre Completo: </label><input type="text" value={message.name} onChange={(e) => setMessage({...message,name:e.target.value})} />
                    <label>Email: </label><input type="text" value={message.email} onChange={(e) => setMessage({...message,email:e.target.value})} />
                    <label>Mensaje: </label><textarea rows={8} value={message.message} onChange={(e) => setMessage({...message,message:e.target.value})} />

                    <div onClick={sendMessage}  className="buttonsend">
                        <div className="buttonse buttonse-one">
                            <span>ENVIAR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}