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
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [carnet, setCarnet] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [sede, setSede] = useState('');
  const [descripcion, setDescripcion] = useState('');
  // Resto de los estados existentes...

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
          // Actualizar los estados existentes según la estructura de tus datos
          setNombre(data.nombre);
          setApellido1(data.apellido1);
          setApellido2(data.apellido2);
          // Resto de los estados existentes...
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
      // Actualizar los datos de la colección "colaborador"
      const colaboradorRef = collection(db, 'colaborador');
      const qColaborador = query(colaboradorRef, where('nombre', '==', nombre));
      const querySnapshotColaborador = await getDocs(qColaborador);

      if (!querySnapshotColaborador.empty) {
        const docColaborador = querySnapshotColaborador.docs[0];
        await updateDoc(docColaborador.ref, {
          nombre,
          apellido1,
          apellido2,
          carnet,
          correo,
          carrera,
          sede,
          descripcion,
        });
        console.log('Cambios guardados con éxito.');
        navigate('/eventec-web'); // Cambiar cuando exista pantalla de inicio
      }
    } catch (error) {
      console.error('Error al guardar cambios.', error);
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
    Nombre:
    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
  </label>
  <p></p>
  <label>
    Primer apellido:
    <input type="text" value={apellido1} onChange={(e) => setApellido1(e.target.value)} />
  </label>
  <p></p>
  <label>
    Segundo apellido:
    <input type="text" value={apellido2} onChange={(e) => setApellido2(e.target.value)} />
  </label>
  <p></p>
  <label>
    Carnet:
    <input type="text" value={carnet} onChange={(e) => setCarnet(e.target.value)} />
  </label>
  <p></p>
  <label>
    Correo:
    <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
  </label>
  <p></p>
  <label>
    Carrera:
    <input type="text" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
  </label>
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
    Eliminar Colaborador
  </button>
</div>
    </div>
  );
}

export default GestionarColaborador;