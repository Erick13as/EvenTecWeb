import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const LobbyEstudiantesAdmin = () => {
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

    try {
      // Guardar la encuesta en Firestore
      const encuestaRef = await addDoc(collection(db, 'encuesta'), {
        eventoNombre,
        opinion,
        actividadFavorita,
        cambiosSugeridos,
        quiereParticipar,
      });

      console.log("Encuesta guardada con ID: ", encuestaRef.id);

      // Aquí podrías redirigir a otra página o hacer alguna acción adicional si es necesario
    } catch (error) {
      console.error("Error al guardar la encuesta: ", error);
      // Manejar el error, mostrar un mensaje de error, etc.
    }
  };

  return (
    <div className="galeria-container">
      <p></p>
      <p></p>
      <div className="encuesta-container">
        <form onSubmit={submitSurvey} className="formEncuesta">
          <h1 className="title">Administrativo</h1>
          <br />
          <button type="submit" className="buttons">Gestionar Estudiantes</button>
          <button type="submit" className="buttons">Asociaciones</button>
          <button type="submit" className="buttons">Colaboradores</button>
          <button type="submit" className="buttons">Estadísticas</button>
        </form>
      </div>
    </div>
  );
};

export default LobbyEstudiantesAdmin;
