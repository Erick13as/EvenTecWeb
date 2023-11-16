import React, { useState } from "react";
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    const userQuery = query(collection(db, 'usuario'), where('correo', '==', email), where('contrasenna', '==', password));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      var errorMessage = document.getElementById('errorLogin');
      errorMessage.style.display = "block";
      errorMessage.textContent = "Correo o contraseña incorrecta";
      document.getElementById('espace').style.display = "none";
    } else {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const rolValue = userData.rol;

        // Check the value of rolValue and navigate accordingly
        if (rolValue === 'Admin') {
          navigate('/lobbyestudiantesadmin');
        } else {
          navigate('/lobbyEstudiante', { state: { correo: email } });
        }
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="galeria-container">
      <p></p>
      <p></p>
      <div className="sign_in-container">
        <form onSubmit={signIn} className="formSignIn">
          <h1 className="title">Iniciar Sesión</h1>
          <h3 className="text">Ingrese su correo</h3>
          <input
            className="textBox"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <h3 className="text">Ingrese su contraseña</h3>
          <input
            className="textBox"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <h3 id="errorLogin" className="message">Error</h3>
          <br id="espace"></br>
          <button type="submit" className="buttons">Iniciar Sesión</button>
          <button onClick={() => navigate('/registro')} className="buttons">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
