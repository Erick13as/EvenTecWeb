import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const VerEstadisticas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [opinion, setOpinion] = useState("");
  const [actividadFavorita, setActividadFavorita] = useState("");
  const [cambiosSugeridos, setCambiosSugeridos] = useState("");
  const [quiereParticipar, setQuiereParticipar] = useState("");

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
      <div className="encuesta-container">
        <form className="formEncuesta">
          <h1 className="title">Ver Estadísticas</h1>
          <h3 className="text">Seleccione un Evento:</h3>
          <select
            className="textBox"
            value={eventoSeleccionado}
            onChange={(e) => setEventoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un evento</option>
            {eventos.map((evento) => (
              <option key={evento.id} value={evento.nombre}>
                {evento.nombre}
              </option>
            ))}
          </select>
          <br />
          <button onClick={()=>navigate('/estadisticas', { state: { nombreEvento: eventoSeleccionado } })} type="submit" className="buttons">Ver Estadísticas</button>
        </form>
      </div>
    </div>
  );
};

export default VerEstadisticas;
