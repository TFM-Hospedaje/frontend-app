import {FC, useState} from 'react'
import './registro.css'
import {RegistroInterface} from '../../../models/models'
import {ConfirmMail} from './ConfirmMail/ConfirmMail'
import {createUser} from '../../../sevices/AuthService'
import { useToasts} from 'react-toast-notifications'

export const Registro: FC<any> = (props): JSX.Element => {

    const {addToast} = useToasts()

    const [registro,setRegistro] = useState<RegistroInterface>({
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    })

    const [status, setStatus] = useState(false)

    const sendMessage = async () => {
        if(registro.username === '' || registro.username === '' || registro.username === '' || registro.username === '') {
            addToast("Rellena los campos obligatorios",{
                appearance: 'error',
                autoDismiss:true
            })
        } else {
            const res = await createUser(registro)
            if(res.data.code === 200) {
                setStatus(true)
            } else {
                addToast(res.data.data,{
                    appearance: 'error',
                    autoDismiss:true
                })
            }
        }
    }

    return (
        <> 
            {!status?
            <>
                <p className="backbtn" onClick={() => props.setState(true)}><i className="fa fa-arrow-left goback"></i></p>
                <div className="input-group">
                        <input value={registro.email} onChange={(e) => setRegistro({...registro,email:e.target.value})} className="form-control" type="text" autoComplete="off"  placeholder="Email"/>
                            <label >Email</label>
                            {registro.email===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}
                </div>
                

                <div className="input-group">
                        <input value={registro.username} onChange={(e) => setRegistro({...registro,username:e.target.value})} className="form-control" type="text" name="username" id="username" autoComplete="off" placeholder="Username"/>
                            <label >Username</label>
                            {registro.username===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}
                </div>

                <div className="input-group">
                        <input value={registro.password} onChange={(e) => setRegistro({...registro,password:e.target.value})} className="form-control" type="password" name="pass" id="pass" autoComplete="off" placeholder="Password"/>
                            <label >Password</label>
                            {registro.password===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}
                </div>

                <div className="input-group">
                        <input value={registro.repeatPassword} onChange={(e) => setRegistro({...registro,repeatPassword:e.target.value})} className="form-control" type="password" name="reppass" id="reppass" autoComplete="off" placeholder="Repeat Password"/>
                            <label >Repeat Password</label>
                            {registro.repeatPassword===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>}
                </div>

                <div onClick={sendMessage} className="box-1">
                    <div className="btn btn-one">
                        <span>REGISTER</span>
                    </div>
                </div>

            </>
        :

        <ConfirmMail />

        }
            
                
             </>
    )
}