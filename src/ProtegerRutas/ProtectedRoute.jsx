
import {Navigate} from "react-router-dom";
import Loading from "../Componentes/Loading";
import { useAuth } from "../Contexto/authContext";

export function ProtectedRoute({children}) {
    const {user, loading} = useAuth(null);

    //Condicional para validar la navegacion si es que el usuario no se encuentra logueado
    if (loading) return <Loading/>;
    if (!user) return <Navigate to = "/" />;

    return <>{children} </>;
}