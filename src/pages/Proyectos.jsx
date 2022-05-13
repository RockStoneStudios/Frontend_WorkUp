import { useEffect } from  'react'
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../Hooks/useProyectos";
import Alerta from "../components/Alerta";


const Proyectos = () => {
   const {proyectos,alerta} = useProyectos();
 
    

  return (
    <>
     <h1 className='text-4xl font-bold'>Proyectos</h1>
     {alerta.msg && <Alerta alerta ={alerta}/>}
     <div className="bg-white shadow mt-10 rounded-lg ">
         {proyectos.length ? 
           proyectos.map(proyecto =>(
             <PreviewProyecto
               key={proyecto._id}
               proyecto = {proyecto}
             />
           ))
         : <p className="mt-5 text-center text-gray-600 uppercase font-semibold">No hay Proyectos</p>}
     </div>
    </>
  )
}

export default Proyectos;