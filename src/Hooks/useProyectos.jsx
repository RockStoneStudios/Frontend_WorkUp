import {useContext} from 'react';
import ProyectosContext from '../Context/ProyectosProvider';


const useProyectos = () =>{
    return useContext(ProyectosContext);
}


export default useProyectos;