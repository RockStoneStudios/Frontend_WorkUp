import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth";

const Sidebar = () => {
 const {auth} = useAuth();
 console.log("Hey");
 console.log(auth.nombre);

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-100 px-5 py-10">
        <p className="text-xl font-bold">Hola : {auth.nombre}</p>
        <Link to="crear-proyecto" className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md">Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar