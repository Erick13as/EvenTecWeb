import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function ConsultarEventos() {
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEventOptions = async () => {
      const actividadCollection = collection(db, 'evento');
      const actividadQuery = query(actividadCollection);

      try {
        const actividadSnapshot = await getDocs(actividadQuery);
        const options = actividadSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().nombre,
        }));
        setEventOptions(options);

        if (options.length > 0) {
          setButtonDisabled(false);
        }
      } catch (error) {
        console.error('Error al cargar las opciones del combobox:', error);
      }
    };

    fetchEventOptions();
  }, []);

  const handleActividadChange = (event) => {
    setSelectedActividad(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedActividad !== "") {
      navigate('/gestionarEvento', { state: { eventoId: selectedActividad } });
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
        <h1>Eventos Programados</h1>
        <p>Lista:</p>
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
          disabled={buttonDisabled}
        >
          Ver evento
        </button>
        <button
          onClick={() => navigate('/agregarColaborador', { state: { eventoId: selectedActividad } })}
          className='botonOA2'
          disabled={buttonDisabled}
        >
          Agregar colaborador
        </button>
      </div>
    </div>
  );
}

export default ConsultarEventos;
