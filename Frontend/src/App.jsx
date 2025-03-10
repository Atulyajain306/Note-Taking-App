import './App.css'
import {Toaster} from "react-hot-toast"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import DetailPage from './components/DetailPage'
import {Routes,Route, Navigate} from "react-router-dom"
import { useAuthContext } from './context/Auth'
function App() {
    const {authUser,isAuth}=useAuthContext();
  return (
    <>
      <Routes>
        <Route path='/' element={ authUser ? <Home/> : <Navigate to='/login' /> } />
        <Route path='/login' element={ authUser ? <Navigate to='/' /> : <Login/>} />
        <Route path='/signup' element={ isAuth ?<Navigate to='/login' />  :<Signup/>} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
     <Toaster/> 
    </>
  )
}

export default App
