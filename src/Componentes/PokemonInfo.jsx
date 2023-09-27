import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../Contexto/authContext"
import Api_conection from "../Hooks/Api_conection"
import poke_info_functions from "../Hooks/poke_info_functions"
import { useEffect } from "react"
import { SelectIdioma } from "./SelectIdioma"


export const PokemonInfo = () => {

    const navigate = useNavigate()

    const { idioma, region, pokemonSelect, siguientePokemon, nombresDePokemon, idiomas, cambiarIdioma } = useAuth()

    const { crearGradiente, gradientStyle, color } = poke_info_functions()

    const { pokemonDatos, guardarDatosPokemon } = Api_conection()

    const { tipos, id, nombre, imagenes, entrada, specie } = pokemonDatos
    
    useEffect(() => { 
        guardarDatosPokemon( nombresDePokemon[pokemonSelect - 1], idioma, region)
    }, [idioma, region, pokemonSelect]) 

    useEffect(() => {
        crearGradiente(tipos) 
    }, [tipos])

    return (
        <div className="poke_info_backgroud">  
            <div className="poke_info_container" style={gradientStyle}>
                <div className="grid_item poke_nav">
                    <i onClick={() => navigate('/')} className="bi bi-arrow-left-circle-fill" title="Home"></i>
                    <SelectIdioma idiomas={idiomas} idioma={idioma} funcion={cambiarIdioma}/>
                </div>
                <div className="grid_item poke_img">
                    <h1>{nombre.toUpperCase()}</h1>
                    <div className="poke_img_container" >
                        <img src={imagenes.front_default} alt=""/>
                    </div>
                    <div className="tipos_info_container">
                        {
                            tipos.map( t => 
                                <button style={{background: color(t.id)}} className='tipo' key={t.nombre}>{t.nombre.toUpperCase()}</button> 
                            )
                        }
                    </div>
                </div>
                <div className="grid_item poke_select">
                    <i className="bi bi-caret-left-fill" onClick={ () => siguientePokemon(-1)}/>
                    <h3>#{id}</h3>
                    <i className="bi bi-caret-right-fill" onClick={ () => siguientePokemon(1)}/>
                </div>
                <div className="grid_item poke_desc">
                    <h2>{specie.toUpperCase()}</h2>
                    <div className="poke_desc_container">
                        <p>{entrada}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
