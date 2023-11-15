import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

function RegistrarColaborador() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [carnet, setCarnet] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [sede, setSede] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardarColaborador = async () => {
    try {
      const colaboradorRef = collection(db, 'colaborador');
      await addDoc(colaboradorRef, {
        nombre,
        apellido1,
        apellido2,
        carnet,
        correo,
        carrera,
        sede,
        descripcion,
      });
      console.log('Colaborador registrado con éxito.');
      navigate('/lobbyColaborador'); 
    } catch (error) {
      console.error('Error al registrar colaborador:', error);
    }
  };

  return (
    <div className="galeria-container">
      <form className="formBarra">
        <button onClick={() => navigate('/lobbyColaborador')} className='botonOA'>Volver al inicio</button>
        <div className="botonBarra-container">
          <button onClick={() => navigate('/eventec-web')} className='botonOA2'>Cerrar Sesión</button>
        </div>
      </form>
      <p></p>
      <p></p>
      <div className="form-actividad">
        <h1>Registrar Colaborador</h1>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <p></p>
        <label>
          Primer apellido:
          <input type="text" value={apellido1} onChange={(e) => setApellido1(e.target.value)} />
        </label>
        <p></p>
        <label>
          Segundo apellido:
          <input type="text" value={apellido2} onChange={(e) => setApellido2(e.target.value)} />
        </label>
        <p></p>
        <label>
          Carnet:
          <input type="text" value={carnet} onChange={(e) => setCarnet(e.target.value)} />
        </label>
        <p></p>
        <label>
          Correo:
          <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <p></p>
        <label>
          Carrera:
          <input type="text" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
        </label>
        <p></p>
        <label>
          Sede:
          <input type="text" value={sede} onChange={(e) => setSede(e.target.value)} />
        </label>
        <p></p>
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <p></p>

        <button onClick={handleGuardarColaborador} className="botonOA2">
          Guardar Colaborador
        </button>
      </div>
    </div>
  );
}

export default RegistrarColaborador;
