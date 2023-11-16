import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function RegistrarAsociacion() {
  const navigate = useNavigate();
  const [nombreAsociacion, setNombreAsociacion] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcionAsociacion, setDescripcionAsociacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [codigoCarrera, setCodigoCarrera] = useState('');
  const [sede, setSede] = useState('');
  const [miembros, setMiembros] = useState([]);
  const [nuevoMiembro, setNuevoMiembro] = useState('');

  const handleAgregarMiembro = () => {
    if (nuevoMiembro.trim() !== '') {
      // Verificar si el carnet ya está en la lista
      if (!miembros.includes(nuevoMiembro)) {
        setMiembros([...miembros, nuevoMiembro]);
        setNuevoMiembro('');
      } else {
        console.warn('El carnet ya está en la lista.');
      }
    }
  };

  const handleQuitarMiembro = (index) => {
    const nuevaListaMiembros = [...miembros];
    nuevaListaMiembros.splice(index, 1);
    setMiembros(nuevaListaMiembros);
  };

  const handleGuardarAsociacion = async () => {
    try {
      const asociacionRef = collection(db, 'asociacion');
      await addDoc(asociacionRef, {
        nombre: nombreAsociacion,
        tipo,
        descripcion: descripcionAsociacion,
        correo,
        codigoCarrera,
        sede,
        miembros,
      });
      console.log('Asociación registrada con éxito.');
      navigate('/LobbyAsociaciones');
    } catch (error) {
      console.error('Error al registrar asociación:', error);
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
        <h1>Registrar Asociación</h1>
        <label>
          Nombre:
          <input type="text" value={nombreAsociacion} onChange={(e) => setNombreAsociacion(e.target.value)} />
        </label>
        <p></p>
        <label>
          Descripción:
          <input type="text" value={descripcionAsociacion} onChange={(e) => setDescripcionAsociacion(e.target.value)} />
        </label>
        <p></p>
        <label>
          Correo:
          <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <p></p>
        <label>
          Código de Carrera:
          <input type="text" value={codigoCarrera} onChange={(e) => setCodigoCarrera(e.target.value)} />
        </label>
        <p></p>
        <label>
          Sede:
          <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} />
        </label>
        <p></p>
        <label>
          Miembros:
          <input
            type="text"
            value={nuevoMiembro}
            onChange={(e) => setNuevoMiembro(e.target.value)}
            placeholder="Carnet del nuevo miembro"
          />
          <button onClick={handleAgregarMiembro}>+</button>
        </label>
        <ul>
          {miembros.map((miembro, index) => (
            <li key={index}>
              {miembro} <button onClick={() => handleQuitarMiembro(index)}>-</button>
            </li>
          ))}
        </ul>
        <p></p>

        <button onClick={handleGuardarAsociacion} className="botonOA2">
          Guardar Asociación
        </button>
      </div>
    </div>
  );
}

export default RegistrarAsociacion;
