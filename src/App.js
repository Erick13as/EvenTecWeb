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

import ConsultarEventos from './components/ConsultarEventos';
import GestionarEvento from './components/GestionarEvento';
import VerEventoTerminado from './components/VerEventoTerminado';
import ProgramacionActividad from './components/ProgramacionActividad';
import ConsultarEstudiantes from './components/ConsultarEstudiantes';
import GestionarEstudiante from './components/GestionarEstudiante';
import RedesSociales from './components/RedesSociales';

import LobbyAsociaciones from './components/LobbyAsociaciones';
import LobbyColaborador from './components/LobbyColaborador';
import LobbyEstudiante from './components/LobbyEstudiante';
import GestionarColaborador from './components/GestionarColaborador';

import LobbyEstudiantesAdmin from './components/LobbyEstudiantesAdmin';
import Comunicacion from './components/Comunicacion';
import VerEstadisticas from './components/VerEstadisticas';
import Estadisticas from './components/Estadisticas';


import Propuesta from './components/Propuesta';
import Encuesta from './components/Encuesta';
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
        <Route path='/consultarEventos' element={<ConsultarEventos />} />
        <Route path='/gestionarEvento' element={<GestionarEvento />} />
        <Route path='/verEventoTerminado' element={<VerEventoTerminado />} />
        <Route path='/programacionActividad' element={<ProgramacionActividad />} />
        <Route path='/consultarEstudiantes' element={<ConsultarEstudiantes />} />
        <Route path='/gestionarEstudiante' element={<GestionarEstudiante />} />
        <Route path='/redesSociales' element={<RedesSociales />} />
        <Route path='/LobbyAsociaciones' element={<LobbyAsociaciones />} />
        <Route path='/LobbyColaborador' element={<LobbyColaborador />} />
        <Route path='/LobbyEstudiante' element={<LobbyEstudiante />} />
        <Route path='/gestionarColaborador' element={<GestionarColaborador />} />

        <Route path='/propuesta' element={<Propuesta />} />
        <Route path='/encuesta' element={<Encuesta />} />
        <Route path='/lobbyestudiantesadmin' element={<LobbyEstudiantesAdmin />} />
        <Route path='/comunicacion' element={<Comunicacion />} />
        <Route path='/verestadisticas' element={<VerEstadisticas />} />
        <Route path='/estadisticas' element={<Estadisticas />} />
       
      </Routes>
    </div>
    </BrowserRouter>
  )
}


export default App;