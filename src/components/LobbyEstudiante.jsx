import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LobbyEstudiante = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state && location.state.correo;

  return (
    <div className="galeria-container">
        <form className="formBarra">
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className="botonOA2">
            Cerrar Sesión
          </button>
        </div>
      </form>
      <p></p>
      <p></p>
      
      <div className="lobby-container">
        <h1 className="lobby-title">Estudiantes</h1>
        
        {/* Botones */}
        <div className="lobby-botones-container">
          <button className="lobby-boton" onClick={() => navigate('/calendarioEventos', { state: { correo: email } })}>Calendario de Eventos</button>
          <button className="lobby-boton" onClick={() => navigate('/eventos', { state: { correo: email } })}>Inscripcion de  Eventos</button>
          <button className="lobby-boton" onClick={() => navigate('/misEventos', { state: { correo: email } })}>Mis Eventos</button>
          <button className="lobby-boton" onClick={() => navigate('/comunicacion', { state: { correo: email } })}>Comunicación</button>
        </div>
      </div>
    </div>
  );
};

export default LobbyEstudiante;