import {useState} from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const OlvidePassword = () => {
  const [email,setEmail] = useState('');
  const [alerta,setAlerta] = useState({});


   const handleSubmit = async (e) =>{
     e.preventDefault();
     if(email ===''){
       setAlerta({
         msg : "Debes Ingresar Email",
         error : true
       })
       return;
     }
      try{
        // Todo: Mover hacia un cliente axios
         const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{email});
        setAlerta({
          msg : data.message,
          error : false
        });
        setEmail('');
         
        }catch(error){
          setAlerta({
            msg : error.response.data.message,
            error : true
          })
      }

   }
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize' >Recupera tu acceso y no pierdas tus  {''}<span className='text-slate-700 capitalize '>proyectos</span>
    </h1>

    {alerta.msg && <Alerta alerta={alerta}/>}

    <form className='my-10 bg-white shadow rounded-lg p-9' onSubmit={handleSubmit}>
    <div className='my-5'>
      <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="email">Email</label>
      <input  className= "w-full mt-3 p-3 border rounded-xl bg-gray-100"
        type="email"
        id='email'
        placeholder='Email de Registro'
        value={email}
        onChange = {e =>setEmail(e.target.value)}
         
         />
    </div>
   

    <input type="submit"
      value= "Enviar Codigo"
      className='bg-sky-700 mb-4 w-full py-3 text-white uppercase rounded-lg  text-center cursor-pointer hover:bg-sky-800 transition-colors' 
    />
 </form>
 <nav className='lg:flex lg : justify-between'>
         <Link className='block text-center my-5 text-slate-500 uppercase text-sm mr-5' to="/registrar">¿No tienes una cuenta Registrate</Link>
         <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
       </nav>
 </>
  )
}

export default OlvidePassword;