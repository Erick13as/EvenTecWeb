import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function ConsultarActividades() {
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true); // Agregamos un estado para deshabilitar el botón
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar las opciones del combobox desde Firebase
    const fetchEventOptions = async () => {
      const actividadCollection = collection(db, 'actividad');
      const actividadQuery = query(actividadCollection);

      try {
        const actividadSnapshot = await getDocs(actividadQuery);
        const options = actividadSnapshot.docs.map((doc) => ({
          id: doc.data().descripcion,
          name: doc.data().descripcion, // Asumiendo que tienes un campo nombreEvento en tus documentos
        }));
        setEventOptions(options);

        // Habilitar el botón si se encontraron datos
        if (options.length > 0) {
          setButtonDisabled(false);
        }
      } catch (error) {
        console.error('Error al cargar las opciones del combobox:', error);
      }
    };

    fetchEventOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El segundo argumento vacío asegura que se carguen las opciones solo una vez al montar el componente

  // Función para manejar el cambio en el combobox
  const handleActividadChange = (event) => {
    setSelectedActividad(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedActividad!==""){
        navigate('/gestionarActividad', { state: { actividad: selectedActividad } })
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
        <h1>Actividades Programadas</h1>
        <p>Lista de Actividades:</p>
        <select onChange={handleActividadChange} value={selectedActividad}>
          <option value="">...</option>
          {eventOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <p></p>
        <button
          onClick={() => handleNavigate()}
          className='botonOA2'
          disabled={buttonDisabled} // Deshabilitar el botón si no hay datos
        >
          Ver actividad
        </button>
      </div>
    </div>
  );
}

export default ConsultarActividades;

