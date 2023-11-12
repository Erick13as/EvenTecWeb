import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Encuesta = () => {
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
          <h1 className="title">Encuesta de Evento</h1>
          <h3 className="text">Nombre del Evento: {eventoNombre}</h3>
          <h3 className="text">¿Qué le pareció el evento?</h3>
          <textarea
            className="textBox"
            placeholder="Ingrese su opinión"
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
          />
          <h3 className="text">¿Cuál fue su actividad favorita?</h3>
          <input
            className="textBox"
            type="text"
            placeholder="Actividad favorita"
            value={actividadFavorita}
            onChange={(e) => setActividadFavorita(e.target.value)}
          />
          <h3 className="text">¿Qué le hubiera gustado que fuera diferente?</h3>
          <textarea
            className="textBox"
            placeholder="Ingrese sus sugerencias"
            value={cambiosSugeridos}
            onChange={(e) => setCambiosSugeridos(e.target.value)}
          />
          <h3 className="text">¿Le gustaría seguir participando?</h3>
          <select
            className="textBox"
            value={quiereParticipar}
            onChange={(e) => setQuiereParticipar(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          <br />
          <button type="submit" className="buttons">Enviar Encuesta</button>
        </form>
      </div>
    </div>
  );
};

export default Encuesta;
