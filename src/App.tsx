import {FC, useEffect, useState} from 'react';
import './App.css';
import { Home } from './components/Home/Home';
import { HomePage } from './components/HomePage/HomePage'
import { checkAuth } from './sevices/AuthService'

export const App: FC = () => {

  const [token,setToken] = useState(false)

  useEffect(() => {
    const isLoged = async () => {
      const res = await checkAuth()
      setToken(res.data.data)
    }
    isLoged()
  }, [])
  

  if(!token) {
    return <Home setToken={setToken}/>
  }

  return (
      <HomePage setToken={setToken}/>
  );
}
