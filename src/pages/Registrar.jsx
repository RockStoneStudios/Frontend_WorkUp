import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';

import clienteAxios from '../config/clienteAxios';


const Registrar = () => {
   const [nombre,setNombre ] = useState('');
   const [email,setEmail ] = useState('');
   const [password,setPassword ] = useState('');
   const [repetirPassword,setRepetirPassword ] = useState('');
   const [alerta , setAlerta] = useState({});
  
 
    const handleSubmit =  async(e) =>{
      e.preventDefault(); 
       if([nombre,email,password,repetirPassword].includes('')){
          setAlerta({
            msg : 'Todos los campos son obligatorios',
            error : true
          });
          return;
       }
        if(password !== repetirPassword){
          setAlerta({
            msg : "Los Password no coinciden",
            error : true
          });
          return;
        }
        if(password.length<6){
           setAlerta({
             msg : "El Password debe tener minimo 6 Caracteres",
             error : true
           })
           return;
        }
        setAlerta({});
        try{
           const {data} = await clienteAxios.post(`usuarios/registrar`,{
             nombre,email,password
           });
             setAlerta({
                msg : data.message,
                error : false
             });

             setNombre('');
             setEmail('');
             setPassword('');
             setRepetirPassword('');
            

        }catch(error){
          setAlerta({
            msg : error.response.data.message,
            error : true
          })
        }
    }
    return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize' >Crea tu Cuenta y Administra tus {''}<span className='text-slate-700 capitalize '>proyectos</span>
    </h1>
      {alerta.msg && <Alerta alerta={alerta}/>}
    <form 
      onSubmit={handleSubmit}
      className='my-10 bg-white shadow rounded-lg p-9'>
     <div className='my-5'>
         <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="nombre">Nombre</label>
         <input  
         className= "w-full mt-3 p-3 border rounded-xl bg-gray-100" 
         type="text"
          id='nombre' 
          placeholder='Ingresa Nombre'
          value={nombre} 
          onChange ={e=> setNombre(e.target.value)}
          />
       </div>
       <div className='my-5'>
         <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="email">Email</label>
         <input 
          className= "w-full mt-3 p-3 border rounded-xl bg-gray-100"
           type="email" 
           id='email'
           placeholder='Email de Registro'
           value={email}
           onChange = {e=> setEmail(e.target.value)}
            />
       </div>
       <div className='my-5'>
         <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="password">Password</label>
         <input  className= "w-full mt-3 p-3 border rounded-xl bg-gray-100"
          type="password" 
          id='password'
          placeholder='Password'
          value={password}
          onChange = {e => setPassword(e.target.value)}
           
           />
       </div>
       <div className='my-5'>
         <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="password2">Repetir Password</label>
         <input  className= "w-full mt-3 p-3 border rounded-xl bg-gray-100"
          type="password"
           id='password2'
           placeholder='Confirmar Password'
           value={repetirPassword}
           onChange = {e => setRepetirPassword(e.target.value)} />
       </div>

       <input type="submit"
         value= "Crear Cuenta"
         className='bg-sky-700 mb-4 w-full py-3 text-white uppercase rounded-lg  text-center cursor-pointer hover:bg-sky-800 transition-colors' 
       />
    </form>
     <nav className='lg:flex lg : justify-between'>
       <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/">¿Ya tienes una Cuenta? Inicia Sesion </Link>
       <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="olvide-password">¿Olvidaste tu contraseña ?</Link>
     </nav>

 
  </>
  )
}

export default Registrar;