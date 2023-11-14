import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Comunicacion = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <p></p>
      <p></p>
      <div className="encuesta-container">
        <form onSubmit={submitSurvey} className="formEncuesta">
          <h1 className="title">Comunicación</h1>
          <br />
          <button type="submit" className="buttons">Foro Discusión</button>
          <button type="submit" className="buttons">Formulario de propuestas    </button>
          <button type="submit" className="buttons">Volver</button>
        </form>
      </div>
    </div>
  );
};

export default Comunicacion;
