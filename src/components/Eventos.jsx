import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function Eventos() {
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar las opciones del combobox desde Firebase
    const fetchEventOptions = async () => {
      const inscripcionCollection = collection(db, 'inscripcion');
      const inscripcionQuery = query(inscripcionCollection, where('idEstado', '==', 'interes'));

      try {
        const inscripcionSnapshot = await getDocs(inscripcionQuery);
        const options = inscripcionSnapshot.docs.map((doc) => ({
          id: doc.data().idEvento,
          name: doc.data().idEvento, // Asumiendo que tienes un campo nombreEvento en tus documentos
        }));
        setEventOptions(options);
      } catch (error) {
        console.error('Error al cargar las opciones del combobox:', error);
      }
    };

    fetchEventOptions();
  }, []); // El segundo argumento vacío asegura que se carguen las opciones solo una vez al montar el componente

  // Función para manejar el cambio en el combobox
  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  return (
    <div className="galeria-container">
        <form className="formBarra">
            <div className="botonBarra-container">
              <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
            </div>
        </form>
      <p></p>
      <p></p>
      <div className="form-container">
      <h1>Inscripción</h1>
      <p>Eventos de interés:</p>
      <select onChange={handleEventChange} value={selectedEvent}>
        <option value="">...</option>
        {eventOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <p></p>
      <button className='botonOA2'>Ver evento</button>
      </div>
    </div>
  );
}

export default Eventos;
