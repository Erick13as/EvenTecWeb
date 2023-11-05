import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function Inscripcion() {
    const navigate = useNavigate();
    const location = useLocation();
    const evento = location.state && location.state.evento;

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
            <p></p>
            <button onClick={() => navigate('/inscripcion')} className='botonOA2'>Ver evento</button>
        </div>
        </div>
    );
}
  
export default Inscripcion;