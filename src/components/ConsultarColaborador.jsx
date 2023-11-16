import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function ConsultarColaborador() {
  const navigate = useNavigate();
  const location = useLocation();
  const [carnet, setCarnet] = useState('');
  const [colaborador, setColaborador] = useState(null);
  const [eventos, setEventos] = useState([]);

  const handleBuscarColaborador = async () => {
    try {
      // Consultar el colaborador por carnet
      const colaboradoresCollection = collection(db, 'colaborador');
      const colaboradorQuery = query(colaboradoresCollection, where('carnet', '==', carnet));
      const colaboradorSnapshot = await getDocs(colaboradorQuery);

      if (!colaboradorSnapshot.empty) {
        // Obtener datos del colaborador
        const colaboradorData = colaboradorSnapshot.docs[0].data();
        setColaborador(colaboradorData);

        // Obtener eventos a los que está agregado
        const eventosCollection = collection(db, 'evento');
        const eventosQuery = query(eventosCollection, where('colaboradores', 'array-contains', carnet));
        const eventosSnapshot = await getDocs(eventosQuery);
        const eventosData = eventosSnapshot.docs.map((doc) => doc.data());

        // Verificar que los eventos contengan la propiedad 'nombre'
        const eventosConNombre = eventosData.filter((evento) => evento.nombre);

        setEventos(eventosConNombre);
      } else {
        console.log('Colaborador no encontrado.');
        setColaborador(null);
        setEventos([]);
      }
    } catch (error) {
      console.error('Error al buscar colaborador:', error);
    }
  };

  const handleEditarColaborador = () => {
    // Navegar a la pantalla de gestión de colaborador y pasar el colaborador como estado
    navigate('/gestionarColaborador', { state: { colaborador, eventos } });
  };

  const handleEliminarColaborador = async () => {
    try {
      if (colaborador) {
        // Eliminar el colaborador de la colección
        const colaboradorRef = doc(db, 'colaborador', colaborador.id);
        await deleteDoc(colaboradorRef);

        console.log('Colaborador eliminado con éxito.');
        navigate('/LobbyAsociaciones');
      }
    } catch (error) {
      console.error('Error al eliminar colaborador:', error);
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
        <h1>Consultar Colaborador</h1>
        <label>
          Carnet:
          <input type="text" value={carnet} onChange={(e) => setCarnet(e.target.value)} />
        </label>
        <p></p>
        <button onClick={handleBuscarColaborador} className="botonOA2">
          Buscar Colaborador
        </button>

        {colaborador && (
          <div>
            <h2>Datos del Colaborador</h2>
            <p>Nombre: {colaborador.nombre}</p>
            <p>Apellido 1: {colaborador.apellido1}</p>
            <p>Apellido 2: {colaborador.apellido2}</p>
            <p>Carnet: {colaborador.carnet}</p>
            <p>Correo: {colaborador.correo}</p>
            <p>Carrera: {colaborador.carrera}</p>
            <p>Sede: {colaborador.sede}</p>
            <p>Descripción: {colaborador.descripcion}</p>
            {/* Agrega más campos según tu estructura de base de datos */}
            <h2>Eventos</h2>
            {eventos.map((evento) => (
              <p key={evento.id}>{evento.nombre}</p>
            ))}
            <p></p>
            <button onClick={handleEditarColaborador} className="botonOA2">
              Editar Colaborador
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultarColaborador;
