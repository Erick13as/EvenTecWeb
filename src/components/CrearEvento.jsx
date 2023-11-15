import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function CrearEvento() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [lugar, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [requisitosEspeciales, setRecursos] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [categoria, setCategoria] = useState('');
  // Ahora, colaboradores es un array
  const [colaboradores, setColaboradores] = useState([]);

  const handleCrearEvento = async () => {
    try {
      const eventoRef = collection(db, 'evento');
      await addDoc(eventoRef, {
        nombre,
        fechaInicio,
        fechaFin,
        horaInicio,
        horaFin,
        lugar,
        descripcion,
        requisitosEspeciales,
        capacidad,
        categoria,
        colaboradores,
      });
      console.log('Evento creado con éxito.');
      navigate('/redesSociales', { state: { evento: nombre } });
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  return (
    <div className="galeria-container">
      <form className="formBarra">
        <button onClick={() => navigate('/LobbyAsociaciones')} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="form-actividad">
        <h1>Crear Evento</h1>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <p></p>
        <label>
          Fecha Inicio:
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </label>
        <p></p>
        <label>
          Fecha Fin:
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </label>
        <p></p>
        <label>
          Hora de Inicio:
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        </label>
        <p></p>
        <label>
          Hora de Cierre:
          <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
        </label>
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
        <button onClick={handleCrearEvento} className="botonOA2">
          Crear Evento
        </button>
      </div>
    </div>
  );
}

export default CrearEvento;
