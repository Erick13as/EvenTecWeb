import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, getDocs, updateDoc, arrayUnion, doc, getDoc } from 'firebase/firestore'; // Agrega la importación aquí
import { db } from '../firebase/firebaseConfig';

function AgregarColaborador() {
  const navigate = useNavigate();
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState('');
  const [evento, setEvento] = useState(null);
  const location = useLocation();
  const { eventoId } = location?.state || {};

  useEffect(() => {
    const fetchColaboradores = async () => {
      const colaboradoresCollection = collection(db, 'colaborador');
      const colaboradoresQuery = query(colaboradoresCollection);

      try {
        const colaboradoresSnapshot = await getDocs(colaboradoresQuery);
        const colaboradoresList = colaboradoresSnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombre,
        }));
        setColaboradores(colaboradoresList);
      } catch (error) {
        console.error('Error al cargar la lista de colaboradores:', error);
      }
    };

    const fetchEvento = async () => {
      if (eventoId) {
        const eventoDoc = await getDoc(doc(db, 'evento', eventoId));
        if (eventoDoc.exists()) {
          setEvento(eventoDoc.data());
        }
      }
    };

    fetchColaboradores();
    fetchEvento();
  }, [eventoId]);

  const handleGuardarColaborador = async () => {
    try {
      if (!selectedColaborador || !eventoId) {
        console.error('Debes seleccionar un colaborador y tener un evento válido.');
        return;
      }

      const eventoRef = doc(db, 'evento', eventoId);
      await updateDoc(eventoRef, {
        colaboradores: arrayUnion(selectedColaborador),
      });

      console.log('Colaborador agregado al evento con éxito.');
      navigate('/LobbyAsociaciones');
    } catch (error) {
      console.error('Error al agregar colaborador al evento:', error);
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
      <div className="form-actividad">
        <h1>Agregar Colaborador</h1>
        <p>Evento Seleccionado: {evento && evento.nombre}</p>
        <label>
          Colaborador:
          <select onChange={(e) => setSelectedColaborador(e.target.value)} value={selectedColaborador}>
            <option value="">Seleccione un colaborador</option>
            {colaboradores.map((colaborador) => (
              <option key={colaborador.id} value={colaborador.id}>
                {colaborador.nombre}
              </option>
            ))}
          </select>
        </label>
        <p></p>
        <button onClick={handleGuardarColaborador} className="botonOA2">
          Agregar Colaborador al Evento
        </button>
      </div>
    </div>
  );
}

export default AgregarColaborador;
