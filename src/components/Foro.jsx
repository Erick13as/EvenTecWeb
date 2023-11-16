import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot,query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate,useLocation } from 'react-router-dom';

const Foro = () => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const correo = location.state && location.state.correo;
  const [nombreUsuario, setNombreUsuario] = useState("");
  useEffect(() => {
    const obtenerNombreUsuario = async () => {
      const usuariosQuery = query(collection(db, 'usuario'), where('correo', '==', correo));
      const usuariosSnapshot = await getDocs(usuariosQuery);

      if (!usuariosSnapshot.empty) {
        const usuario = usuariosSnapshot.docs[0].data();
        setNombreUsuario(usuario.nombreCompleto);
      }
    };

    obtenerNombreUsuario();
    // Escuchar a los cambios en la colección "mensajes"
    const unsubscribe = onSnapshot(collection(db, 'mensajes'), (snapshot) => {
      // Ordenar los mensajes por timestamp de manera descendente
      const mensajesOrdenados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.timestamp - a.timestamp);

      setMensajes(mensajesOrdenados);
    });

    // Limpieza del efecto al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'mensajes'), {
        // Puedes cambiar esto por un identificador único o algo más relevante
        usuario: nombreUsuario,
        mensaje,
        timestamp: new Date(),
      });

      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el mensaje: ", error);
    }
  };

  return (
    <div className="galeria-container">
      <form className="formBarra">
        <button onClick={() => navigate('/comunicacion')} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="chat-mensajes-container">
        <div className="chat-mensajes">
          {mensajes.map((msg) => (
            <div key={msg.id} className={`mensaje ${msg.usuario === nombreUsuario ? 'mi-mensaje' : 'otro-mensaje'}`}>
              <span className="usuario">{msg.usuario}</span>
              <p>{msg.mensaje}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="formulario-chat">
        <textarea
          className="mensaje-input"
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button type="submit" className="enviar-button">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default Foro;