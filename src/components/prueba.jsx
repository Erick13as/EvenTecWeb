import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, query, getDocs, where, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function Eventos() {
    return (
      <div>
        <h1>Inscripción</h1>
        <p>Eventos de interés:</p>
        <button>Ver eventos</button>
      </div>
    );
  }
  
  export default Eventos;