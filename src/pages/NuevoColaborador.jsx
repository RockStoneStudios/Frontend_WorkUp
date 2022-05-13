import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react";
import useProyectos from "../Hooks/useProyectos";
import {useParams} from 'react-router-dom';
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
    const {obtenerProyecto,proyecto,cargando,colaborador,alerta,agregarColaborador} = useProyectos();
   
    const params = useParams();
    useEffect(()=>{
      obtenerProyecto(params.id);
    },[])
  
     if(!proyecto?._id) return <Alerta alerta={alerta}/>
    if(cargando) return 'cargando . . . .'
  return (
    <>
      <h1 className="text-4xl font-black">
          Añadir Colaborador(a) al Proyecto : {proyecto.nombre}
      </h1>
       <div className="mt-10 flex justify-center">
           <FormularioColaborador/>
       </div>
       {
         cargando ? <p classname = "text-center">cargando ....</p> : colaborador?._id && (
           <div className="flex justify-center">
             <div className="bg-white py-10 w-full my-5 px-5 md:w-1/2 rounded-lg shadow-md">
               <div className="text-center mb-10 text-xl font-bold">Resultado</div>
               <div className="flex justify-between items-center">
                 <p>{colaborador.nombre}</p>
                 <button 
                 onClick={()=> agregarColaborador({
                   email : colaborador.email
                 })}
                 type="button" 
                 className="bg-slate-500 px-5 text-white text-sm py-3 rounded-lg uppercase font-bold"
                 >Agregar al Proyecto</button>
               </div>
             </div>
           </div>
         )
       }
    </>
  )
}

export default NuevoColaborador