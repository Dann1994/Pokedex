import { useEffect, useState } from "react"
import { authContext, useAuth } from "../Contexto/authContext"
import Api_conection from "../Hooks/Api_conection"
import { BarNavHome } from "./BarNavHome"
import { PokeCard } from "./pokeCard"



export const Home = () => {
    const { tamanioApi, reiniciarDatos  } = useAuth()
    const { obtenerApiTamanio } = Api_conection()
    const [ cant, setCant ] = useState([1])
    const [ cantCarg, setCantCarg] = useState(50)

    const contarElementos = () => {
        let nro = []
        for (let i = 1; i <= cantCarg; i++) {
            nro.push(i); 
        }
        return nro
    }

    const cargarMas = () => {
        setCantCarg(cantCarg + 50)
    }

    useEffect(() => {
        setCant(contarElementos)
    }, [cantCarg])
    

    useEffect(() => {
        obtenerApiTamanio('https://pokeapi.co/api/v2/pokemon-species/')
    }, [])

    useEffect(() => {
        reiniciarDatos()
    }, [])
    

    return (
        <>
            <BarNavHome/>
            <div className='home'> 
            
                {
                    cant.map( c => 
                        <PokeCard key={c} nro={c}/> 
                    )
                }
            </div>
            <div className="vermas_container">
                <button onClick={cargarMas}>Mostrar 50 mas</button>
            </div>
        </>
    )
}
