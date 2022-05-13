import React from 'react'
import { formatearFecha } from '../helpers/FormatearFecha';
import useProyectos from '../Hooks/useProyectos';
import useAdmin from '../Hooks/useAdmin';



const Tarea = ({tarea}) => {
  const {handleModalEditarTarea,handleModalEliminarTarea,completarTarea} = useProyectos();
  console.log(tarea);
  const admin = useAdmin();
 
  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div className='flex flex-col items-start'>
           <p className='text-xl mb-1'>{tarea.nombre}</p>
            <p className='mb-1 text-xs text-gray-500 uppercase'>{tarea.descripcion}</p>
            <p className='text-sm mb-1'>{formatearFecha(tarea.fechaEntrega)}</p>
            <p className='text-gray-600 mb-2'>Proridad : {tarea.prioridad}</p>
            {tarea.estado && <p className='text-xs bg-green-600 uppercase mr-8 text-white p-1 rounded-lg'>Completada por :  {' '} <span className='font-bold'>{tarea.nombre}</span></p>}
        </div>
        <div className="flex gap-2 flex-col lg:flex-row">
              {admin &&(
     
                  <button  onClick={()=>handleModalEditarTarea(tarea)} className='bg-indigo-600 px-4 py-3 rounded-lg font-bold text-sm text-white uppercase'>
                    Editar
                  </button>
             )}
            
             <button 
                onClick={()=> completarTarea(tarea._id)}
                className={`${tarea.estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 rounded-lg font-bold text-sm text-white uppercase`}>
                  {tarea.estado ? 'Completa' : 'Incompleta'}
            </button>
              {admin &&(

              
             <button onClick={()=> handleModalEliminarTarea(tarea)} className='bg-red-600 px-4 py-3 rounded-lg font-bold text-sm text-white uppercase'>
               Eliminar
             </button>
             )}
        </div>
    </div>
  )
}

export default Tarea