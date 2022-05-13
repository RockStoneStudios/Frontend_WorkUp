import useProyectos from "../Hooks/useProyectos";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FormularioProyecto from "./FormularioProyecto";

const EditarProyecto = () => {
   const params = useParams();
    const {proyecto,obtenerProyecto,cargando,eliminarProyecto} = useProyectos();

    useEffect(()=>{
      obtenerProyecto(params.id);
    },[]);
  
      const handleClick = ()=>{
         if(confirm('¿Deseas eliminar este proyecto')){
           eliminarProyecto(params.id);
         }

      }

  return (
     <>
      <div className="flex justify-between">
      <h1 className="font-black text-4xl">Editar Proyecto : {proyecto.nombre}</h1>
     <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
       <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
     
       <button 
       className="uppercase font-bold"
        onClick={handleClick}
       >Eliminar</button>
      </div>
      </div>
    
     <div className="mt-8 flex justify-center">
       
     <FormularioProyecto/>
   
     </div>
     </>
  )
}

export default EditarProyecto;