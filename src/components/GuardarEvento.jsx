import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, where, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GuardarEvento() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.correo;
    const evento = location.state && location.state.evento;

    const [eventoInfo, setEventoInfo] = useState(null);

    useEffect(() => {
        // Verificar si hay un evento actual antes de realizar la consulta
        if (evento) {
            const eventosCollection = collection(db, 'evento');
            const q = query(eventosCollection, where('nombre', '==', evento));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                // Solo debería haber un documento coincidente, pero se puede iterar si es necesario
                querySnapshot.forEach((doc) => {
                    // Obtener los datos del documento
                    const data = doc.data();
                    setEventoInfo(data);
                });
            });

            // Limpiar el efecto al desmontar el componente
            return () => unsubscribe();
        }
    }, [evento]);

    const handleGuardarEvento = async () => {
        // Verificar si hay información del evento antes de guardar en la colección inscripcion
        if (eventoInfo) {
            const inscripcionCollection = collection(db, 'inscripcion');

            // Verificar si ya existe una inscripción con el mismo correo e idEvento
            const existingInscripcionQuery = query(
                inscripcionCollection,
                where('correo', '==', email),
                where('idEvento', '==', evento)
            );

            const existingInscripcionSnapshot = await getDocs(existingInscripcionQuery);

            // Si no hay coincidencias, agregar un nuevo documento a la colección inscripcion
            if (existingInscripcionSnapshot.empty) {
                await addDoc(inscripcionCollection, {
                    calificacion: 0,
                    correo: email,
                    idEncuesta: "",
                    idEstado: "interes",
                    idEvento: evento,
                });

                // Redirigir después de guardar el evento
                navigate('/eventec-web');
            } else {
                // Mostrar notificación si ya existe una inscripción con el mismo correo e idEvento
                toast.error('Evento ya guardado', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
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
            <div className="form-actividad">
                <h1>{evento}</h1>
                <p>Informacion del evento:</p>
                {eventoInfo && (
                    <div>
                        <p>Hora de Inicio: {eventoInfo.horaInicio}</p>
                        <p>Hora Fin: {eventoInfo.horaFin}</p>
                        <p>Lugar: {eventoInfo.lugar}</p>
                        <p>Capacidad: {eventoInfo.capacidad}</p>
                    </div>
                )}
                <button onClick={handleGuardarEvento} className='botonOA2'>Guardar Evento</button>
                {/* Agregar el contenedor de notificaciones */}
                <ToastContainer />
            </div>
        </div>
    );
}

export default GuardarEvento;
