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

function GestionarEstudiante() {
  const navigate = useNavigate();
  const location = useLocation();
  const [carnet, setCarnet] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [carrera, setCarrera] = useState('');
  const [rol, setRol] = useState('');
  const [sede, setSede] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const carnetBuscado = location.state && location.state.carnet;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const actividadRef = collection(db, 'usuario');
        const q = query(actividadRef, where('carnet', '==', carnetBuscado));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setCarnet(data.carnet);
          setNombreCompleto(data.nombreCompleto);
          setCarrera(data.carrera);
          setRol(data.rol);
          setSede(data.sede);
          setDescripcion(data.descripcion);
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
  }, [carnetBuscado]);

  const handleGuardarCambios = async () => {
    try {
      const actividadRef = collection(db, 'usuario');
      const q = query(actividadRef, where('carnet', '==', carnetBuscado));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
          carnet,
          nombreCompleto,
          carrera,
          rol,
          sede,
          descripcion,
        });
        console.log('Cambios guardados con éxito.');
        navigate('/lobbyestudiantesadmin') 
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const handleEliminarActividad = async () => {
    try {
      const actividadRef = collection(db, 'usuario');
      const q = query(actividadRef, where('carnet', '==', carnetBuscado));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        await deleteDoc(doc.ref);
        console.log('Actividad eliminada con éxito.');
        navigate('/lobbyestudiantesadmin');
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
        <button onClick={() => navigate('/lobbyestudiantesadmin')} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="form-actividad">
        <h1>{nombreCompleto}</h1>
        <label>
          Carnet:
          <input type="text" value={carnet} onChange={(e) => setCarnet(e.target.value)} />
        </label>
        <p></p>
        <label>
          Nombre Completo:
          <input type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
        </label>
        <p></p>
        <label>
          Carrera: 
          <input type="text" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
        </label>
        <p></p>
        <label>
          Rol:
          <input type="text" value={rol} onChange={(e) => setRol(e.target.value)} />
        </label>
        <p></p>
        <p></p>
        <label>
          Sede:
          <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} />
        </label>
        <p></p>
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <p></p>
        <button onClick={handleGuardarCambios} className="botonOA2">
          Guardar Cambios
        </button>
        <p></p>
        <button onClick={handleEliminarActividad} className="botonOA2">
          Eliminar Estudiante
        </button>
      </div>
    </div>
  );
}

export default GestionarEstudiante;
