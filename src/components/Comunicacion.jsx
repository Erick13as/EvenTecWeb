import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Comunicacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const correo = location.state && location.state.correo;

  //const [eventoNombre, setEventoNombre] = useState(location.state ? location.state.eventoNombre : "");
  const [eventoNombre, seteventoNombre] = useState("Ejemplo");
  const [opinion, setOpinion] = useState("");
  const [actividadFavorita, setActividadFavorita] = useState("");
  const [cambiosSugeridos, setCambiosSugeridos] = useState("");
  const [quiereParticipar, setQuiereParticipar] = useState("");

  const submitSurvey = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="galeria-container">
      <form className="formBarra">
        <button onClick={() => navigate('/lobbyEstudiante', { state: { correo: correo } })} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="encuesta-container">
        <form onSubmit={submitSurvey} className="formEncuesta">
          <h1 className="title">Comunicación</h1>
          <br />
          <button className="lobby-boton" onClick={() => navigate('/foro', { state: { correo: correo } })}>Foro Discusión</button>
          <button className="lobby-boton" onClick={() => navigate('/propuesta', { state: { correo: correo } })}>Formulario de propuestas    </button>
        </form>
      </div>
    </div>
  );
};

export default Comunicacion;
