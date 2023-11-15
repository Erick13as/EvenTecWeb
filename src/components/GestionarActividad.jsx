import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  onSnapshot,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function GestionarActividad() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [eventoSeleccionado, setEventoSeleccionado] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [recursos, setRecursos] = useState('');
  const [eventos, setEventos] = useState([]);
  const actividad = location.state && location.state.actividad;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const actividadRef = collection(db, 'actividad');
        const q = query(actividadRef, where('descripcion', '==', actividad));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setFecha(data.fecha);
          setHoraInicio(data.horaInicio);
          setHoraFin(data.horaFin);
          setEventoSeleccionado(data.idEvento);
          setUbicacion(data.ubicacion);
          setDescripcion(data.descripcion);
          setRecursos(data.recursos);
        } else {
          console.log(
            'No se encontraron documentos que coincidan con la actividad actual.'
          );
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, [actividad]);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const eventosRef = collection(db, 'evento');
        const eventosSnapshot = await getDocs(eventosRef);
        const eventosData = eventosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventos(eventosData);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    obtenerEventos();
  }, []);

  const handleGuardarCambios = async () => {
    try {
      const actividadRef = collection(db, 'actividad');
      const q = query(actividadRef, where('descripcion', '==', actividad));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
          fecha,
          horaInicio,
          horaFin,
          idEvento: eventoSeleccionado,
          ubicacion,
          descripcion,
          recursos,
        });
        console.log('Cambios guardados con éxito.');
        navigate('/lobbyAsociaciones') 
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const handleEliminarActividad = async () => {
    try {
      const actividadRef = collection(db, 'actividad');
      const q = query(actividadRef, where('descripcion', '==', actividad));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await deleteDoc(doc.ref);
        console.log('Actividad eliminada con éxito.');
        navigate('/lobbyAsociaciones'); 
      } else {
        console.log('No se encontraron documentos que coincidan con la actividad actual.');
      }
    } catch (error) {
      console.error('Error al eliminar actividad:', error);
    }
  };
  
  return (
    <div className="galeria-container">
      <form className="formBarra">
        <button onClick={() => navigate('/lobbyAsociaciones')} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="form-actividad">
        <h1>{actividad}</h1>
        <label>
          Fecha:
          <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <p></p>
        <label>
          Hora de Inicio: 
          <input type="text" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        </label>
        <p></p>
        <label>
          Hora de Cierre:
          <input type="text" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
        </label>
        <p></p>
        <label>
          Evento:
          <select
            value={eventoSeleccionado}
            onChange={(e) => setEventoSeleccionado(e.target.value)}
          >
            {eventos.map((evento) => (
              <option key={evento.id} value={evento.nombre}>
                {evento.nombre}
              </option>
            ))}
          </select>
        </label>
        <p></p>
        <label>
          Ubicacion:
          <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
        </label>
        <p></p>
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <p></p>
        <label>
          Recursos:
          <input type="text" value={recursos} onChange={(e) => setRecursos(e.target.value)} />
        </label>
        <p></p>
        <button onClick={handleGuardarCambios} className="botonOA2">
          Guardar Cambios
        </button>
        <p></p>
        <button onClick={handleEliminarActividad} className="botonOA2">
          Eliminar Actividad
        </button>
      </div>
    </div>
  );
}

export default GestionarActividad;
