import React from 'react'
import { useEffect, useState } from 'react';
import {useParams,Link} from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';


const ConfirmarCuenta = () => {
   const [alerta,setAlerta] = useState({});
   const [cuenta,setCuenta] = useState(false);
   const params = useParams();
    const {id} = params;

    useEffect(()=>{
         const confirmarCuenta = async()=>{
            try{
               const url = `/usuarios/confirmar/${id}`;
                const {data} = await clienteAxios(url);
                setAlerta({
                  msg : data.message,
                  error : false
                });
             
                setCuenta(true);
            
            }catch(error){
               setAlerta({
                 msg : error.response.data.message,
                 error : true
               })
            }
         }
         confirmarCuenta();
    },[])

 


  return (
   <>
      <h1 className='text-sky-600 font-black text-6xl capitalize' >Confirma cuenta y empieza a crear  tus {''}<span className='text-slate-700 capitalize '>proyectos</span>
      </h1>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 bg-slate-50'>
        {alerta.msg && <Alerta alerta={alerta}/>}
        {cuenta && <Link className='block text-center text-slate-500 uppercase text-sm' to="/">Inicia Sesion</Link>}
      </div>
      <div>
      </div>
   </>
  )
}

export default ConfirmarCuenta;