import React,{useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../Hooks/useAuth';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerta,setAlerta] = useState({});
const {setAuth,auth,cargando} = useAuth();
const navigate = useNavigate();

  const handleSubmit = async e =>{
    e.preventDefault();
     if([email,password].includes('')){
          setAlerta({
            msg : "Todos Los Campos son obligatorios",
            error : true
          });
          return;
     }
     setAlerta({})
      try{
           const {data} = await clienteAxios.post(`/usuarios/login`,{
             email,
             password
           });
           localStorage.setItem('token',data.token);
           setAuth(data);
           setEmail('');
           setPassword('');
           navigate('/proyectos');
      }catch(error){
        setAlerta({
          msg: error.response.data.message,
          error : true
        })
      }
    
  }


  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize' >Inicia sesión y administra tus {''}<span className='text-slate-700 capitalize '>proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta}/>}
      <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-9'>
         <div className='my-5'>
           <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="email">Email</label>
           <input value={email} onChange={e =>setEmail(e.target.value)} className= "w-full mt-3 p-3 border rounded-xl bg-gray-100" type="email" id='email' placeholder='Email de Registro' />
         </div>
         <div className='my-5'>
           <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="password">Password</label>
           <input value={password}  onChange={e =>setPassword(e.target.value)} className= "w-full mt-3 p-3 border rounded-xl bg-gray-100" type="password" id='password' placeholder='Password' />
         </div>

         <input type="submit"
           value= "Iniciar Sesion"
           className='bg-sky-700 mb-4 w-full py-3 text-white uppercase rounded-lg  text-center cursor-pointer hover:bg-sky-800 transition-colors' 
         />
      </form>
       <nav className='lg:flex lg : justify-between'>
         <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="registrar">¿No tienes una cuenta Registrate</Link>
         <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="olvide-password">¿Olvidaste tu contraseña ?</Link>
       </nav>

    </>
  )
}

export default Login;