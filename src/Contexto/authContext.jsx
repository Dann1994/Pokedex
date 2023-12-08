import { createContext, useContext, useEffect, useState } from "react";
import Api_conection from "../Hooks/Api_conection";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider')
    return context
};

export const AuthProvider = ({children}) => {

    const { obtenerRegiones, obtenerNombres, obtenerDatosDePokemon, obtenerIdiomas } = Api_conection()

    const [ pokemonSelect, setPokemonSelect ] = useState(1)

    const [ regiones, setRegiones ] = useState([])

    const [ idiomas, setIdiomas ] = useState([])

    const [ idioma, setIdioma ] = useState('es')

    const [ region, setRegion ] = useState('kanto')

    const [ nombresDePokemon, setNombresDePokemon ] = useState([])

    const [ filtro, setFiltro ] = useState('') 


    const pokeDatos = {
        imagenes: '',
        id: 0,
        nombre: '???',
        color: 'white',
        entrada: '---',
        specie: 'Pokemon',
        tipos: '?'
    }

    const [ pokemonActual, setPokemonActual ] = useState(pokeDatos)


    const guardarNombresDePokemon = async () => {
        const nombres = await obtenerNombres(region)
        setNombresDePokemon(nombres)
    }

    const obtenerPokemonActual = async (nro) => {
        setPokemonActual( await obtenerDatosDePokemon(nro, idioma))
    }

    const guardarIdiomas = async () => {
        setIdiomas( await obtenerIdiomas())
    }

    const cambiarIdioma = ({target}) => {
        const { value } = target
        setIdioma( value )
        console.log(value);
    }

    const cambiarRegion = ({target}) => {
        const { value } = target
        setRegion( value )
        console.log(value);
    }

    const cambiarRegiones = async () => {
        setRegiones( await obtenerRegiones() )
    }

    const buscar = ({ target }) => {
        const { value } = target
        setFiltro( value )
    }

    const cambiarPokemon = (nro) => {
        setPokemonSelect(nro)
    }

    const siguientePokemon = (nro) => {
        const max = nombresDePokemon.length
        const min = Math.max(1, (pokemonSelect + nro))
        const nuevo = Math.min(max, min)
        return nuevo
    }


    useEffect(() => {
        cambiarRegiones()
    }, [])
    

    useEffect(() => {
        guardarNombresDePokemon()
    }, [region])

    useEffect(() => {
        guardarIdiomas()
    }, [])
    

    return <authContext.Provider value={{ 
        nombresDePokemon,
        obtenerPokemonActual,
        idioma,
        cambiarIdioma,
        cambiarRegion,
        region,
        regiones,
        buscar,
        filtro,
        guardarIdiomas,
        idiomas,
        pokemonSelect,
        cambiarPokemon,
        siguientePokemon
    }}>{children}</authContext.Provider>;
}