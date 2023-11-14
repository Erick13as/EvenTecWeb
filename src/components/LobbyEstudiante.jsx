import React from "react";
import { useNavigate } from "react-router-dom";

const LobbyEstudiante = () => {
  const navigate = useNavigate();

  const navigateTo = (ruta) => {
    navigate(ruta);
  };

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
          <button className="lobby-boton" onClick={() => navigateTo("/Inscripcion")}>Inscripcion de  Eventos</button>
          <button className="lobby-boton" onClick={() => navigateTo("/CalendarioEventos")}>Calendario de Eventos</button>
          <button className="lobby-boton" onClick={() => navigateTo("/MisEventos")}>Mis Eventos</button>
        </div>
      </div>
    </div>
  );
};

export default LobbyEstudiante;