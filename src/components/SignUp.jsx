import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [name, setName] = useState("");
  const [carnet, setCarnet] = useState("");
  const [carrera, setCarrera] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sede, setSede] = useState("");


  const agregarDatos = async() => {        
    try {
      const docRef = await addDoc(collection(db, "usuario"), {
        correo: email,
        nombreCompleto: name,
        rol: "Cliente",
        carnet:carnet, 
        carrera:carrera,
        descripcion: descripcion,
        sede:sede,
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const signUp = (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      var errorMessage = document.getElementById('errorLogin');
      errorMessage.style.display = "block";
      errorMessage.textContent = "Las contraseñas no coinciden";
      document.getElementById('espace').style.display = "none";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        agregarDatos();
        navigate('/eventec-web')
      })
      .catch((error) => {
        console.log(error);
        var errorMessage = document.getElementById('errorLogin');
        errorMessage.style.display = "block";
        errorMessage.textContent = "Datos no válidos";
        document.getElementById('espace').style.display = "none";
      });
  };

  const navigate = useNavigate();

  return (
    <div className="galeria-container">
      <div className="sign_up-container">
        <form onSubmit={signUp} className="formSignUp">
          <h1 className="title">Crear Cuenta</h1>
          <h3 className="text">Ingrese su correo</h3>
          <input
            className="textBoxSingUp"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <h3 className="text">Ingrese su contraseña</h3>
          <input
            className="textBoxSingUp"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            className="textBoxSingUp"
            type="password"
            placeholder="Confirmar Contraseña"
            value={confPassword}
            onChange={(e) => setconfPassword(e.target.value)}
          ></input>
          <h3 className="text">Ingrese su nombre completo</h3>
          <input
            className="textBoxSingUp"
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <h3 className="text">Ingrese su carnet</h3>
          <input
            className="textBoxSingUp"
            type="number"
            placeholder="Carnet"
            value={carnet}
            onChange={(e) => setCarnet(e.target.value)}
          ></input>
          <h3 className="text">Ingrese su carrera</h3>
          <select
            className="textBox"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Ingeniería en Computación">Ingeniería en Computación</option>
            <option value="Ingeniería Mecatrónica">Ingeniería Mecatrónica</option>
            <option value="Ingeniería Forestal">Ingeniería Forestal</option>
            <option value="Ingeniería Física">Ingeniería Física</option>
            <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
            <option value="Ingeniería en Materiales">Ingeniería en Materiales</option>

          </select>
          <h3 className="text">Descripción</h3>
          <select
            className="textBox"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Estudiante regular">Estudiante regular</option>
          </select>
          <h3 className="text">Sede</h3>
          <select
            className="textBox"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Cartago">Cartago</option>
            <option value="Cartago">San José</option>
            <option value="Cartago">San Carlos</option>
            <option value="Cartago">Alajuela</option>
            <option value="Cartago">Limón</option>

          </select>
          <h3 id="errorLogin" className="message">Error</h3>
          <br id="espace"></br>
          <button type="submit" className="buttons">Registrarse</button>
          <button onClick={()=>navigate('/eventec-web')} className="buttons">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
