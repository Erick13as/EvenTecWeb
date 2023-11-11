import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Eventos from './components/Eventos';
import Inscripcion from './components/Inscripcion';
import ConfirmarInscrip from './components/ConfirmarInscrip';
import MisEventos from './components/MisEventos';
import CancelarInscrip from './components/CancelarInscrip';
import ConsultarActividades from './components/ConsultarActividades';
import GestionarActividad from './components/GestionarActividad';
import CalendarioEventos from './components/CalendarioEventos';
import SeleccionarEvento from './components/SeleccionarEvento';
import GuardarEvento from './components/GuardarEvento';
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "./components/Design.css"

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='eventec-web/' element={<SignIn />} /> 
        <Route path='/registro' element={<SignUp />} />
        <Route path='/eventos' element={<Eventos />} />
        <Route path='/inscripcion' element={<Inscripcion />} />
        <Route path='/confirmarInscrip' element={<ConfirmarInscrip />} />
        <Route path='/misEventos' element={<MisEventos />} />
        <Route path='/cancelarInscrip' element={<CancelarInscrip />} />
        <Route path='/consultarActividades' element={<ConsultarActividades />} />
        <Route path='/gestionarActividad' element={<GestionarActividad />} />
        <Route path='/calendarioEventos' element={<CalendarioEventos />} />
        <Route path='/seleccionarEvento' element={<SeleccionarEvento />} />
        <Route path='/guardarEvento' element={<GuardarEvento />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}


export default App;