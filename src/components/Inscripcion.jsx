import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function Inscripcion() {
    const navigate = useNavigate();
    const location = useLocation();
    const evento = location.state && location.state.evento;
    const [eventoData, setEventoData] = useState(null);

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
                    </div>
                )}
                <p></p>
                <button onClick={() => navigate('/inscripcion')} className='botonOA2'>Inscribirse</button>
            </div>
        </div>
    );
}

export default Inscripcion;