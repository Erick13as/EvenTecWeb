import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDocs, query, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarioEventos() {
    const [eventDates, setEventDates] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.correo;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'evento'));
                const querySnapshot = await getDocs(q);
                const dates = [];

                querySnapshot.forEach((doc) => {
                    const fechaInicio = doc.data().fechaInicio;
                    const fechaFin = doc.data().fechaFin;
                    const dateStart = new Date(fechaInicio);
                    const dateEnd = new Date(fechaFin);

                    // Agregar todas las fechas entre horaInicio y horaFin al array de fechas
                    while (dateStart.getDate() <= dateEnd.getDate()) {
                        dateStart.setDate(dateStart.getDate() + 1);
                        dates.push(new Date(dateStart));
                    }
                });

                setEventDates(dates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDateClick = (selectedDate) => {
        console.log('Date clicked:', selectedDate);
        navigate('/seleccionarEvento', { state: { correo: email, fechaSeleccionada: selectedDate } });
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
            <div className="form-calendario">
                <h1>Fechas de Evento</h1>
                <Calendar
                    onClickDay={handleDateClick}
                    tileContent={({ date }) => {
                        // Muestra "Eventos disponibles" en todas las fechas que tienen eventos
                        return eventDates.some((eventDate) => eventDate.toDateString() === date.toDateString()) && (
                            <p>Eventos disponibles</p>
                        );
                    }}
                    className="custom-calendar-style"
                />
            </div>
        </div>
    );
}

export default CalendarioEventos;
