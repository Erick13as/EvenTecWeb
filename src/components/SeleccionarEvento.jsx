import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { format } from 'date-fns';

function SeleccionarEvento() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.correo;
    const fecha = location.state && location.state.fechaSeleccionada;

    // Obtener la fecha en el formato adecuado
    const fechaSeleccionada = format(fecha, 'yyyy-MM-dd');

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const obtenerEventos = async () => {
            const eventosRef = collection(db, 'evento');

            // Consulta para eventos con fechaInicio menor o igual a la fecha seleccionada
            const qInicio = query(
                eventosRef,
                where('fechaInicio', '<=', fechaSeleccionada)
            );

            // Consulta para eventos con fechaFin mayor o igual a la fecha seleccionada
            const qFin = query(
                eventosRef,
                where('fechaFin', '>=', fechaSeleccionada)
            );

            // Obtener los eventos de la primera consulta
            const eventosInicioSnapshot = await getDocs(qInicio);

            // Mapear los resultados de la primera consulta
            const eventosInicioData = eventosInicioSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Obtener los eventos de la segunda consulta
            const eventosFinSnapshot = await getDocs(qFin);

            // Mapear los resultados de la segunda consulta
            const eventosFinData = eventosFinSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Combinar los resultados de ambas consultas sin duplicados
            const eventosData = [...new Set([...eventosInicioData, ...eventosFinData])];

            // Filtrar eventos duplicados
            const eventosFiltrados = eventosData.filter((evento, index, self) =>
                index === self.findIndex((e) => e.id === evento.id)
            );

            // Filtrar eventos según las condiciones adicionales de fechaInicio y fechaFin
            const eventosFiltradosFecha = eventosFiltrados.filter(
                (evento) =>
                    evento.fechaInicio <= fechaSeleccionada && evento.fechaFin >= fechaSeleccionada
            );

            setEventos(eventosFiltradosFecha);
        };

        obtenerEventos();
    }, [fechaSeleccionada]);

    const abrirPantallaEvento = (eventoNombre) => {
        // Navegar a otra pantalla y pasar el correo electrónico y el nombre del evento
        navigate('/guardarEvento', { state: { evento: eventoNombre, correo: email } });
    };

    return (
        <div className="galeria-container">
            <form className="formBarra">
                <button onClick={() => navigate('/lobbyEstudiante', { state: { correo: email } })} className='botonOA'>Volver al inicio</button>
                <div className="botonBarra-container">
                    <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
                </div>
            </form>
            <p></p>
            <p></p>
            <div className="form-container">
                <h1>Eventos disponibles</h1>
                <ul>
                    {eventos.map((evento) => (
                        <li key={evento.id}>
                            {evento.nombre}
                            <button onClick={() => abrirPantallaEvento(evento.nombre)} className='botonOA2'>Ver Detalles</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SeleccionarEvento;
