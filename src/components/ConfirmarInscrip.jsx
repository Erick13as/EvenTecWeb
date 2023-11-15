import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import QRCode from 'qrcode.react';

function ConfirmarInscrip() {
    const navigate = useNavigate();
    const location = useLocation();
    const evento = location.state && location.state.evento;
    const correo = location.state && location.state.correo;
    const fecha = location.state && location.state.fecha;
    const hora = location.state && location.state.hora;

    // Crear una cadena de texto que contiene los datos
    const qrData = `Correo: ${correo}\nEvento: ${evento}\nFecha: ${fecha}\nHora: ${hora}`;

    return (
        <div className="galeria-container">
            <form className="formBarra">
                <button onClick={() => navigate('/lobbyEstudiante', { state: { correo: correo } })} className='botonOA'>Volver al inicio</button>
                <div className="botonBarra-container">
                    <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
                </div>
            </form>
            <p></p>
            <p></p>
            <form className="form-qr">
                <h1>EvenTEC</h1>
                <p>Inscripcion exitosa</p>
                <p></p>
                <QRCode value={qrData} size={200} /> {/* Renderizar el código QR */}
                <p></p>
                <button onClick={() => navigate('/lobbyEstudiante', { state: { correo: correo } })} className='botonOA2'>Volver a inicio</button> 
            </form>
        </div>
    );
}

export default ConfirmarInscrip;