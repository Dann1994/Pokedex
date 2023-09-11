import { createContext, useContext, useEffect, useState } from "react";
import Api_conection from "../Hooks/Api_conection";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider')
    return context
};

export const AuthProvider = ({children}) => {

    const [tamanioApi, setTamanioApi] = useState(1)

    //Id del pokemon actual
    const [ idPoke, setIdPoke ] = useState(1)

    const datos = {
        imagen: '',   //Imagen frontal 
        nombre: '',   //Nombre del pokemon
        tipos: ['?'], //Lista de tipos
        entry: ''     //Entrada en la pokedex
    }

    const [ pokemonDatos, setPokemonDatos] = useState(datos)

    const reiniciarDatos = () => {
        setPokemonDatos(datos)
    }

    return <authContext.Provider value={{ 
        tamanioApi,
        idPoke,
        setIdPoke,
        pokemonDatos,
        setPokemonDatos,
        setTamanioApi,
        reiniciarDatos
    }}>{children}</authContext.Provider>;
}