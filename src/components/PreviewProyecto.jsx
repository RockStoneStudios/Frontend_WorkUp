import React from 'react'
import {Link} from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
const PreviewProyecto = ({proyecto}) => {
    const {auth} = useAuth();
    const {nombre,_id,cliente,creador} = proyecto;
  return (
      <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
        <div className='flex items-center gap-2'>
            <p>
                {nombre}
                <span className='text-sm text-gray-500 uppercase'>
                    {''} {cliente}
                </span>
            </p>
            {auth._id !== creador &&(

            <p className='p-1 ml-3 text-xs rounded-lg text-white font-bold uppercase bg-green-500'>Colaborador</p>
            )}
        </div>
         <Link className=' uppercase text-sm font-semibold text-gray-600 hover:text-gray-800' to={`${_id}`}>Ver proyecto</Link>
      </div>
  )
}

export default PreviewProyecto