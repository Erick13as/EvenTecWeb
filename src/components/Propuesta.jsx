import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Propuesta = () => {
  const [tematica, setTematica] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [actividades, setActividades] = useState("");
  const [fechaSugerida, setFechaSugerida] = useState("");
  const [participantes, setParticipantes] = useState("");

  const submitProposal = async (e) => {
    e.preventDefault();

    try {
      // Guardar la propuesta en Firestore
      const propuestaRef = await addDoc(collection(db, 'propuesta'), {
        tematica,
        objetivo,
        actividades,
        fechaSugerida,
        participantes,
      });

      console.log("Propuesta guardada con ID: ", propuestaRef.id);

      // Aquí podrías redirigir a otra página o hacer alguna acción adicional si es necesario
    } catch (error) {
      console.error("Error al guardar la propuesta: ", error);
      // Manejar el error, mostrar un mensaje de error, etc.
    }
  };

  const navigate = useNavigate();

  return (
    <div className="galeria-container">
      <p></p>
      <p></p>
      <div className="propuesta-container">
        <form onSubmit={submitProposal} className="formPropuesta">
          <h1 className="title">Propuesta de Evento</h1>
          <h3 className="text">Tema:</h3>
          <input
            className="textBox"
            type="text"
            placeholder="Tema"
            value={tematica}
            onChange={(e) => setTematica(e.target.value)}
          />
          <h3 className="text">Objetivo:</h3>
          <input
            className="textBox"
            type="text"
            placeholder="Objetivo"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
          />
          <h3 className="text">Actividades:</h3>
          <textarea
            className="textBox"
            placeholder="Actividades a realizar"
            value={actividades}
            onChange={(e) => setActividades(e.target.value)}
          />
          <h3 className="text">Fecha Sugerida:</h3>
          <input
            className="textBox"
            type="text"
            placeholder="Fecha Sugerida"
            value={fechaSugerida}
            onChange={(e) => setFechaSugerida(e.target.value)}
          />
          <h3 className="text">Cantidad de Participantes:</h3>
          <input
            className="textBox"
            type="number"
            placeholder="Cantidad de Participantes"
            value={participantes}
            onChange={(e) => setParticipantes(e.target.value)}
          />
          <br />
          <button type="submit" className="buttons">Enviar Propuesta</button>
        </form>
      </div>
    </div>
  );
};

export default Propuesta;
