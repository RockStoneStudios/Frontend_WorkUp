import {useState} from 'react';
import useProyectos from '../Hooks/useProyectos';
import Alerta from './Alerta';

const FormularioColaborador = () => {
    const [email,setEmail]  = useState('');
    const {alerta,mostrarAlerta,submitColaborador} = useProyectos();
 
     const handleSubmit = async e =>{
     
         e.preventDefault();
         if(email === ' '){
            mostrarAlerta({
                msg : "El campo es obligatorio",
                error : true
            });
            return;
         }
        await submitColaborador(email);
     }
    


  return (
    <form onSubmit={handleSubmit} className='bg-white w-full py-10 px-5 md:w-1/2 rounded-lg shadow-md'>
        {alerta.msg && <Alerta alerta={alerta}/>}
       <div className="mb-5">
         <label htmlFor="email c" className='text-gray-700 uppercase font-bold text-sm cursor-pointer'>
             Email Colaborador
         </label>
         <input 
           value={email}
           onChange = {e =>setEmail(e.target.value)}
         placeholder='Email del Usuario' type="email"  id= "email c" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded cursor-pointer'/>
        </div>   
        <input type="submit" className='bg-sky-600 hover:bg-sky-700 p-3 cursor-pointer uppercase transition-colors text-white font-bold text-md rounded-md w-full' value="Buscar Colaborador"  />
    </form>
  )
}

export default FormularioColaborador;