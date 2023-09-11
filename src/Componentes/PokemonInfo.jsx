import { useEffect } from "react";
import Api_conection from "../Hooks/Api_conection";
import poke_info_functions from "../Hooks/poke_info_functions";
import { Pokemon_imagen } from "./Pokemon_imagen";
import { IdNumber } from "./IdNumber";
import { Nav_bar } from "./Nav_var";
import { useAuth } from "../Contexto/authContext";


export const PokemonInfo = () => {

    const { siguientePoke, guardarPokeDatos } = Api_conection()

    const { idPoke, pokemonDatos } = useAuth()

    const { imagen, nombre, tipos, entry } = pokemonDatos

    const { color, gradientStyle, crearGradiente } = poke_info_functions()

    

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            siguientePoke(+1);
        } else if (event.key === 'ArrowLeft') {
            siguientePoke(-1);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        crearGradiente(tipos)
        guardarPokeDatos()
    }, [idPoke])

    useEffect(() => {
        crearGradiente(tipos)
    }, [siguientePoke])

    return (
        <>
            {
                imagen !== ''?
                <div className="poke_info_container" style={gradientStyle}>
                    <Nav_bar id={idPoke} funcion={siguientePoke}/>
                    <i onClick={() => siguientePoke(-1)} className="bi bi-caret-left arrows"></i>
                    <div className="pokemon_img_container">
                        <IdNumber id={idPoke}/>
                        <Pokemon_imagen img={imagen}/>
                    </div>
                    <div className="pokemon_data_container">
                        <div className="types_contaner">
                            <button style={{background: color(tipos[0]) }} className='tipo_item'>
                                {tipos[0].toUpperCase()}
                            </button>
                            {
                                tipos.length == 2 &&
                                <button style={{background: color(tipos[1]) }} className='tipo_item'>
                                    {tipos[1].toUpperCase()}
                                </button>
                            }
                        </div>
                        <h2>{nombre.toUpperCase()}</h2>
                        <p className="pk_nro">#{idPoke}</p>
                        <div className="entry_container">
                            <p>
                                {entry}
                            </p>
                        </div>
                    </div>
                    <i onClick={() => siguientePoke(+1)} className="bi bi-caret-right arrows"></i>
                </div> :
                <div className="loading_screen" style={gradientStyle}>
                    <div class="spinner-border text-light loadin_spinner" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            } 
        </>
    )
}