import React from "react";
import { useNavigate } from "react-router-dom";

const LobbyAsociaciones = () => {
  const navigate = useNavigate();

  const navigateTo = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="galeria-container">
      <form className="formBarra">
        <button onClick={() => navigate('/lobbyestudiantesadmin')} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      
      <div className="lobby-container">
        <h1 className="lobby-title">Asociaciones</h1>
        
        {/* Botones */}
        <div className="lobby-botones-container">
          <button className="lobby-boton" onClick={() => navigateTo("/registrarAsociacion")}>Registrar Asociacion</button>
          <button className="lobby-boton" onClick={() => navigateTo("/crearEvento")}>Creacion de Eventos</button>
          <button className="lobby-boton" onClick={() => navigateTo("/consultarEventos")}>Consultar Eventos</button>
          <button className="lobby-boton" onClick={() => navigateTo("/programacionActividad")}>Creacion de actividades</button>
          <button className="lobby-boton" onClick={() => navigateTo("/consultarActividades")}>Consultar actividades</button>
        </div>
      </div>
    </div>
  );
};

export default LobbyAsociaciones;



