import { useEffect} from 'react';
import { useParams ,Link } from 'react-router-dom';
import useProyectos from '../Hooks/useProyectos';
import useAdmin from '../Hooks/useAdmin';
import ModalFormularioTarea from '../components/ModalFormulario';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';
import Colaborador from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import io from 'socket.io-client';

let socket;

const Proyecto = () => {
   
    const params = useParams();
   const {obtenerProyecto, cambiarEstadoTarea,actualizarTareaProyecto,eliminarTareaProyecto,submitTareaProyecto,proyecto,cargando,handleModalTarea,alerta} = useProyectos();
   const {nombre} = proyecto;
   const admin = useAdmin();
  
   useEffect(()=>{
     obtenerProyecto(params.id);
   },[]);

     

      useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('abrir proyecto',params.id);
        
      },[])

       useEffect(()=>{
         socket.on('tarea agregada',(tareaNueva) => {
           if(tareaNueva.proyecto === proyecto._id){

             submitTareaProyecto(tareaNueva)
           }
         })
         socket.on('tarea eliminada',tareaEliminada =>{
            if(tareaEliminada.proyecto === proyecto._id) {
              eliminarTareaProyecto(tareaEliminada);
            }
         });
          socket.on('tarea actualizada',tareaActualizada =>{
             if(tareaActualizada.proyecto._id === proyecto._id){
               actualizarTareaProyecto(tareaActualizada);
             }
          });
          socket.on('nuevo estado',nuevoEstadoTarea =>{
            if(nuevoEstadoTarea.proyecto._id === proyecto._id){
              cambiarEstadoTarea(nuevoEstadoTarea);
            }
          })
       })

   
      

   if(cargando) return 'Cargando . ...'

  return (
   
     <>

      <div className='flex justify-between'>
         
            <h1 className='font-black text-4xl'>{nombre}</h1>
            {admin && (

           
          <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          
            <Link className='uppercase font-bold' to={`/proyectos/editar/${params.id}`}>Editar</Link>
         </div>
          )}
      </div>
         {admin &&(

       
          <button onClick={handleModalTarea} type='button' className=' flex gap-2 items-center justify-center mt-4 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold  text-white text-center bg-green-400'>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Nueva Tarea

          </button>
            )}
          <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>
           
             
            <div className="bg-white shadow mt-10 rounden-10">
              {proyecto.tareas?.length ? 
               proyecto.tareas?.map(tarea=>(
                 <Tarea key={tarea._id} tarea = {tarea}/>
               ))
              : 
               <p className='text-center text-lg font-semibold my-5 p-10'> No hay tareas en este Proyecto</p>
              }
            </div>
            {admin &&(

           <>
             <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl '>Colaboradores</p>
            <Link className='text-gray-400 font-bold uppercase hover:text-gray-800'
             to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>Añadir</Link>
            </div>
            <div className="bg-white shadow mt-10 rounden-10">
              {proyecto.colaboradores?.length ? 
               proyecto.colaboradores?.map(colaborador=>(
                <Colaborador
                 key={colaborador._id}
                 colaborador = {colaborador}
                />
               ))
              : 
               <p className='text-center text-lg font-semibold my-5 p-10'> No hay tareas en este Proyecto</p>
              }
            </div>
            </>
          )}
          <ModalFormularioTarea />
          <ModalEliminarTarea/>
          <ModalEliminarColaborador/>
      </>
    
      
   )
  
}

export default Proyecto