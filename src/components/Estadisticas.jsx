import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Estadisticas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [opinion, setOpinion] = useState("");
  const [actividadFavorita, setActividadFavorita] = useState("");
  const [cambiosSugeridos, setCambiosSugeridos] = useState("");
  const [quiereParticipar, setQuiereParticipar] = useState("");
  
  const [eventoNombre, setEventoNombre] = useState(location.state ? location.state.nombreEvento : "");
  const [datosEvento, setDatosEvento] = useState(null);
  const [asistentes, setAsistentes] = useState([]);
  const [calificacionPromedio, setCalificacionPromedio] = useState(0);

  useEffect(() => {
    // Obtener la lista de eventos desde Firestore
    const obtenerEventos = async () => {
      try {
        const eventosSnapshot = await getDocs(collection(db, 'evento'));
        const listaEventos = eventosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEventos(listaEventos);
      } catch (error) {
        console.error("Error al obtener la lista de eventos: ", error);
      }
    };

    obtenerEventos();
  }, []);

  useEffect(() => {
    // Buscar el documento del evento seleccionado
    const buscarEvento = async () => {
      try {
        const eventoQuery = query(collection(db, 'evento'), where('nombre', '==', eventoNombre));
        const eventoSnapshot = await getDocs(eventoQuery);

        if (!eventoSnapshot.empty) {
          const datosEvento = eventoSnapshot.docs[0].data();
          setDatosEvento(datosEvento);
        } else {
          // Manejar el caso en el que el evento no se encuentre
          console.error("Evento no encontrado");
        }
      } catch (error) {
        console.error("Error al buscar el evento: ", error);
      }
    };

    // Llamar a la función de búsqueda solo si hay un nombre de evento seleccionado
    if (eventoNombre) {
      buscarEvento();
    }
  }, [eventoNombre]);

  useEffect(() => {
    // Obtener la lista de inscripciones desde Firestore
    const obtenerInscripciones = async () => {
      try {
        const inscripcionesQuery = query(collection(db, 'inscripcion'), where('idEvento', '==', eventoNombre));
        const inscripcionesSnapshot = await getDocs(inscripcionesQuery);

        const listaAsistentes = inscripcionesSnapshot.docs.map((doc) => doc.data());
        setAsistentes(listaAsistentes);

        // Calcular la calificación promedio
        const calificacionesArray = listaAsistentes.map((asistente) => asistente.calificacion);
        const calificacionPromedio = calificacionesArray.length > 0 ? calificacionesArray.reduce((total, calificacion) => total + calificacion, 0) / calificacionesArray.length : 0;
        setCalificacionPromedio(calificacionPromedio);
      } catch (error) {
        console.error("Error al obtener la lista de inscripciones: ", error);
      }
    };

    // Llamar a la función de búsqueda solo si hay un nombre de evento seleccionado
    if (eventoNombre) {
      obtenerInscripciones();
    }
  }, [eventoNombre]);


  return (
    <div className="galeria-container">
      <p></p>
      <p></p>
      <div className="encuesta-container">
        <form className="formEncuesta">
          <h1 className="title">{eventoNombre}</h1>
          <h2 className="title">DATOS</h2>
          {datosEvento && (
            <div>
              <p>Fecha de Inicio: {datosEvento.fechaInicio}</p>
              <p>Fecha de Fin: {datosEvento.fechaFin}</p>
              <p>Hora de Inicio: {datosEvento.horaInicio}</p>
              <p>Hora de Fin: {datosEvento.horaFin}</p>
              <p>Cantidad de Asistentes: {asistentes.length}</p>
              <p>Calificación Promedio: {calificacionPromedio.toFixed(2)}</p>
            </div>
          )}
          <button onClick={() => navigate('/verestadisticas')} type="submit" className="buttons">Volver</button>
        </form>
      </div>
    </div>
  );
};

export default Estadisticas;


