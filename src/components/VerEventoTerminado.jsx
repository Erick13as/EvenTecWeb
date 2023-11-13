import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    updateDoc,
    doc,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function VerEventoTerminado() {
    const navigate = useNavigate();
    const location = useLocation();
    const evento = location.state && location.state.evento;
    const correo = location.state && location.state.correo;
    const [eventoData, setEventoData] = useState(null);
    const [calificacion, setCalificacion] = useState(1);

    useEffect(() => {
        // Realizar la consulta a la colección "evento" en Firebase Firestore
        const eventosRef = collection(db, 'evento');
        const q = query(eventosRef, where('nombre', '==', evento));

        getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const eventoDoc = querySnapshot.docs[0];
                    const eventData = eventoDoc.data();
                    setEventoData(eventData);
                } else {
                    console.log('No se encontró el evento en la base de datos.');
                }
            })
            .catch((error) => {
                console.error('Error al obtener los datos del evento:', error);
            });
    }, [evento]);

    const guardarCalificacion = async () => {
        // Obtener la referencia al documento en la colección "inscripcion"
        const inscripcionRef = collection(db, 'inscripcion');
        const q = query(inscripcionRef, where('correo', '==', correo), where('idEvento', '==', evento));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const inscripcionDoc = querySnapshot.docs[0];
            // Actualizar el atributo calificacion en el documento
            await updateDoc(doc(db, 'inscripcion', inscripcionDoc.id), {
                calificacion: calificacion,
            });
            console.log('Calificación guardada con éxito.');
        } else {
            console.log('No se encontró la inscripción en la base de datos.');
        }
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
            <div className="form-inscripcion">
                <h1>{evento}</h1>
                {eventoData && (
                    <div>
                        <p>Capacidad: {eventoData.capacidad}</p>
                        <p>Fecha de Inicio: {eventoData.fechaInicio}</p>
                        <p>Hora de Inicio: {eventoData.horaInicio}</p>
                        <label htmlFor="calificacion">Calificación:</label>
                        <select
                            id="calificacion"
                            name="calificacion"
                            value={calificacion}
                            onChange={(e) => setCalificacion(parseInt(e.target.value))}
                        >
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <p></p>
                <button
                onClick={() => {
                    guardarCalificacion();
                    navigate('/encuesta');
                }}
                className='botonOA2'
            >
                Calificar Evento
            </button>
            </div>
        </div>
    );
}

export default VerEventoTerminado;
