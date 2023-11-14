import React from "react";
import { useNavigate } from "react-router-dom";

const LobbyColaborador = () => {
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
        <h1 className="lobby-title">Colaboradores</h1>
        
        {/* Botones */}
        <div className="lobby-botones-container">
          <button className="lobby-boton" onClick={() => navigateTo("/RegistrarColaborador")}>Registrar Colaborador</button>
          <button className="lobby-boton" onClick={() => navigateTo("/GestionarColaborador")}>Gestionar Colaborador</button>
         </div>
      </div>
    </div>
  );
};

export default LobbyColaborador;