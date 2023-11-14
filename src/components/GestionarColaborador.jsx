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

function GestionarColaborador() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [lugar, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [requisitosEspeciales, setRecursos] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [categoria, setCategoria] = useState('');

  const evento = location.state && location.state.evento;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const actividadRef = collection(db, 'evento');
        const q = query(actividadRef, where('nombre', '==', evento));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setFechaInicio(data.fechaInicio);
          setFechaFin(data.fechaFin);
          setHoraInicio(data.horaInicio);
          setHoraFin(data.horaFin);
          setUbicacion(data.lugar);
          setDescripcion(data.descripcion);
          setRecursos(data.requisitosEspeciales);
          setCapacidad(data.capacidad);
          setCategoria(data.categoria);
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
  }, [evento]);

  const handleGuardarCambios = async () => {
    try {
      const actividadRef = collection(db, 'evento');
      const q = query(actividadRef, where('nombre', '==', evento));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
          fechaInicio,
          fechaFin,
          horaInicio,
          horaFin,
          lugar,
          descripcion,
          requisitosEspeciales,
          capacidad,
          categoria
        });
        console.log('Cambios guardados con éxito.');
        navigate('/eventec-web') //Cambiar cuando exista pantalla de inicio
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const handleEliminarActividad = async () => {
    try {
      const actividadRef = collection(db, 'evento');
      const q = query(actividadRef, where('nombre', '==', evento));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await deleteDoc(doc.ref);
        console.log('Actividad eliminada con éxito.');
        navigate('/eventec-web'); //Cambiar cuando exista pantalla de inicio
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
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className="botonOA2">
            Cerrar Sesión
          </button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="form-actividad">
        <h1>{evento}</h1>
        <label>
          Fecha Inicio:
          <input type="text" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </label>
        <p></p>
        <label>
          Fecha Fin:
          <input type="text" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
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
        <p></p>
        <label>
          Lugar:
          <input type="text" value={lugar} onChange={(e) => setUbicacion(e.target.value)} />
        </label>
        <p></p>
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <p></p>
        <label>
          Capacidad:
          <input type="text" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} />
        </label>
        <p></p>
        <label>
          Categoría:
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        </label>
        <p></p>
        <label>
          Requisitos Especiales:
          <input type="text" value={requisitosEspeciales} onChange={(e) => setRecursos(e.target.value)} />
        </label>
        <p></p>
        <button onClick={handleGuardarCambios} className="botonOA2">
          Guardar Cambios
        </button>
        <p></p>
        <button onClick={handleEliminarActividad} className="botonOA2">
          Eliminar Evento
        </button>
      </div>
    </div>
  );
}

export default GestionarColaborador;