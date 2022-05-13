import React,{useState,useEffect} from 'react'
import { Link , useParams} from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';


const NuevoPassword = () => {
     const params = useParams();
     const {token} = params;
     const [password,setPassword] = useState('');
     const [tokenValido,setTokenValido] = useState(false);
     const [alerta,setAlerta] = useState({});
     const [passwordModificad, setPasswordModificado] = useState(false);

    useEffect(()=>{
      const comprobarToken = async() =>{
          try{
         
              await clienteAxios(`/usuarios/olvide-password/${token}`)
             setTokenValido(true);
          }catch(error){
               setAlerta({
                 msg : error.response.data.message,
                 error : true
               })
               
          }
      }
       comprobarToken();
   },[])
 
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(password.length<6) {
      setAlerta({
        msg : "El Password debe tener minimo 6 caracteres",
        error : true
      });
      return;
    }
     try{
       const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url,{password});
      setAlerta({
        msg : data.message,
        error : false
      });
       setPasswordModificado(true);

      }catch(error){
       setAlerta({
          msg : error.response.data.msg,
          error : true
       })
     }
  }
  
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize' >Reestablece tu Password y no pierdas acceso a tus {''}<span className='text-slate-700 capitalize '>proyectos</span>
    </h1>
      {alerta.msg && <Alerta alerta={alerta}/>}
         {tokenValido && (
            <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-9'>
    
            <div className='my-5'>
              <label className='uppercase text-gray-600 block font-bold text-xl cursor-pointer' htmlFor="password">Nuevo Password</label>
              <input  onChange={e=> setPassword(e.target.value)} className= "w-full mt-3 p-3 border rounded-xl bg-gray-100" type="password" id='password' placeholder=' Escribe tu NuevoPassword' />
            </div>
           
     
            <input type="submit"
              value= "Guardar Nuevo Password"
              className='bg-sky-700 mb-4 w-full py-3 text-white uppercase rounded-lg  text-center cursor-pointer hover:bg-sky-800 transition-colors' 
           
              
            />
         </form>
         )}
     {passwordModificad &&(
       
     <nav className='lg:flex lg : justify-between'>
     <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/"> Inicia Sesion </Link>
    
   </nav>
     )}

  </>
  )
}

export default NuevoPassword;