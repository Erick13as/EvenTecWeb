import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function GestionarColaborador() {
  const navigate = useNavigate();
  const location = useLocation();
  const [colaborador, setColaborador] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    carnet: '',
    correo: '',
    carrera: '',
    sede: '',
    descripcion: '',
    // Agrega el resto de los campos aquí...
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const colaboradorRef = collection(db, 'colaborador');
        const q = query(colaboradorRef, where('carnet', '==', location.state.colaborador.carnet));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docColaborador = querySnapshot.docs[0];
          const data = docColaborador.data();
          setColaborador(data);
        } else {
          console.log('No se encontraron documentos que coincidan con el colaborador actual.');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llamar a la función para obtener datos cuando cambie el carnet del colaborador
    obtenerDatos();
  }, [location.state]);

  const handleGuardarCambios = async () => {
    try {
      // Actualizar los datos de la colección "colaborador"
      const colaboradorRef = collection(db, 'colaborador');
      const qColaborador = query(colaboradorRef, where('carnet', '==', location.state.colaborador.carnet));
      const querySnapshotColaborador = await getDocs(qColaborador);

      if (!querySnapshotColaborador.empty) {
        const docColaborador = querySnapshotColaborador.docs[0];
        await updateDoc(docColaborador.ref, colaborador);
        console.log('Cambios guardados con éxito.');
        navigate('/LobbyColaborador'); // Cambiar cuando exista pantalla de inicio
      }
    } catch (error) {
      console.error('Error al guardar cambios.', error);
    }
  };

  const handleEliminarColaborador = async () => {
    try {
      const colaboradorRef = collection(db, 'colaborador');
      const q = query(colaboradorRef, where('carnet', '==', location.state.colaborador.carnet));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docColaborador = querySnapshot.docs[0];
        await deleteDoc(docColaborador.ref);
        console.log('Colaborador eliminado con éxito.');
        navigate('/LobbyColaborador'); //Cambiar cuando exista pantalla de inicio
      } else {
        console.log('No se encontraron documentos que coincidan con el colaborador actual.');
      }
    } catch (error) {
      console.error('Error al eliminar colaborador:', error);
    }
  };

  const handleChange = (e) => {
    // Actualizar el estado del colaborador al escribir en los campos de entrada
    setColaborador({
      ...colaborador,
      [e.target.name]: e.target.value,
    });
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
        <h1>Editar Colaborador</h1>
        <label>
          Carnet:
          <input type="text" name="carnet" value={colaborador.carnet} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Nombre:
          <input type="text" name="nombre" value={colaborador.nombre} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Apellido 1:
          <input type="text" name="apellido1" value={colaborador.apellido1} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Apellido 2:
          <input type="text" name="apellido2" value={colaborador.apellido2} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Correo:
          <input type="text" name="correo" value={colaborador.correo} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Carrera:
          <input type="text" name="carrera" value={colaborador.carrera} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Sede:
          <input type="text" name="sede" value={colaborador.sede} onChange={handleChange} />
        </label>
        <p></p>
        <label>
          Descripcion:
          <input type="text" name="descripcion" value={colaborador.descripcion} onChange={handleChange} />
        </label>
        <p></p>
        <button onClick={handleGuardarCambios} className="botonOA2">
          Guardar Cambios
        </button>
        <p></p>
        <button onClick={handleEliminarColaborador} className="botonOA2">
          Eliminar Colaborador
        </button>
      </div>
    </div>
  );
}

export default GestionarColaborador;
