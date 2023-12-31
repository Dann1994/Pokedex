import { useState } from "react"
import { useAuth } from "../Contexto/authContext"
import { BarNavHome } from "./NavBarHome"
import { PokeCard } from "./pokeCard"



export const Home = () => {

    const [ limite, setLimite ] = useState(50)

    const { nombresDePokemon } = useAuth()

    const cargarMas = () => {
        const maximo = nombresDePokemon.length
        const sumar = limite + 50
        setLimite(Math.min(sumar, maximo))
    }

    return (
        <>
            <div className='home'> 
            <BarNavHome/>
                <div className="cards_content">
                    {
                        nombresDePokemon.slice(0, limite).map( c => 
                            <PokeCard key={c} nro={c}/> 
                        )
                    }
                </div>
            </div>
            { nombresDePokemon.length > limite &&
                <div className="vermas_container">
                    <button onClick={cargarMas}> CARGAR 50</button>
                </div>
            }
        </>
    )
}
