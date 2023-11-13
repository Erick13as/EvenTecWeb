import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import InstagramLogo from '../imagenes/instagramLogo.webp'; // Importa la imagen directamente

function RedesSociales() {
    const navigate = useNavigate();
    const location = useLocation();
    const evento = location.state && location.state.evento; //Necesario enviar el nombre del evento de la pagina anterior

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
                <h1>¡Felicidades!</h1>
                <p>Eventos creado con éxito</p>
                <p>{evento}</p>
                {/* Utiliza la imagen importada directamente */}
                <a href="https://www.instagram.com/teccostarica" target="_blank" rel="noopener noreferrer">
                    <img className="imagen-container" src={InstagramLogo} alt="Instagram Logo" />
                </a>
                <p></p>
                <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Volver a Inicio</button>
            </div>
        </div>
    );
}

export default RedesSociales;
