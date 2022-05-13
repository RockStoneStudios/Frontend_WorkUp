import React from 'react'
import { Link } from 'react-router-dom';
import useProyectos from '../Hooks/useProyectos';
import Busqueda from './Busquedad';
import useAuth from '../Hooks/useAuth';
const Header = () => {

  const {handleBuscador,cerrarSesionProyectos} = useProyectos();
  const {cerrarSesionAuth} = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  }

  return (
      <header className='px-4 py-5 bg-white border-b'>
        <div className="md:flex md:justify-between">
            <h2 className='text-4xl mb-5 md:mb-8 text-sky-600 font-black text-center'>WorkUp</h2>
            <div className='flex flex-col md:flex-row items-center gap-4 '>
            <button 
             onClick={handleBuscador}
            type='button' className='font-bold uppercase'>
              Buscar Proyecto
             </button>
             <Link to= "/proyectos"
             className='font-bold uppercase'>Proyectos</Link>
             <button 
               type='button'
              className='text-white text-sm bg-sky-600 p-2 rounded-md uppercase font-bold'
              onClick = {handleCerrarSesion}
               >Cerrar Sesion</button>
             <Busqueda/>
            </div>
        </div>
      </header>
  )
}

export default Header