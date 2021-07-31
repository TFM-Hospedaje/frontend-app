import {FC, useState} from 'react'
import './login.css'
import {Registro} from '../Registro/Registro'
import LoginInterface from '../../../models/models'
import {useToasts} from 'react-toast-notifications'
import {loginUser} from '../../../sevices/AuthService'

export const Login: FC<any> = (props):JSX.Element => {

    const {addToast} = useToasts()
    
    const [user, setUser] = useState<LoginInterface>({
        username: '',
        password: ''
    })

    const [state, setState] = useState(true)

    const canLogin = async () => {
        if(user.username === '' || user.password === '') {
            addToast('Rellena los campos obligatorios',{
                appearance: 'error',
                autoDismiss:true
            })
        } else {
            const res = await loginUser(user) 
            if(res.data.code !== 200) {
                addToast(res.data.data,{
                    appearance: 'error',
                    autoDismiss:true
                })
            } else {
                localStorage.setItem('jwt', res.data.data.accessToken)
                //const jwt:String = res.data.data.accessToken
                props.setToken(true)
                localStorage.setItem("invited", 'false')
            }
        }
    }

    const resetLogin = () => {
        setUser({username:'',password:''})
    }
    
    return (
        
        <div className="wrapper">
            {state?
            <> 
                <div className="input-group">
                        <input value={user.username} onChange={(e) => setUser({...user,username: e.target.value})} className="form-control" type="text" name="username" id="username" autoComplete="off" placeholder="Username"/>
                            <label >Username</label>
                            {user.username===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>} 
                </div>

                <div className="input-group">
                        <input value={user.password} onChange={(e) => setUser({...user,password: e.target.value})} className="form-control" type="password" name="password" id="password" autoComplete="off" placeholder="Password"/>
                            <label >Password</label>
                            {user.password===''? <div className="req-mark-err">!</div> : <div className="req-mark">!</div>} 
                </div>

                <div onClick={canLogin} className="box-1">
                    <div className="btn btn-one">
                        <span>LOG IN</span>
                    </div>
                </div>
                <p className="text--center">¿No eres miembro? <a  onClick={() => {setState(false);resetLogin()}} className="register">Regístrate ahora!</a></p>
             </>
             : <Registro state={state} setState={setState} /> }   
        </div>
    )
}