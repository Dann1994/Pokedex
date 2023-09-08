import { useEffect } from "react";
import Api_conection from "../Hooks/Api_conection";
import poke_info_functions from "../Hooks/poke_info_functions";
import { Pokemon_imagen } from "./Pokemon_imagen";
import { IdNumber } from "./IdNumber";
import { Nav_bar } from "./Nav_var";


export const PokemonInfo = () => {

    const { datos, siguietePoke, id } = Api_conection()

    const { imagen, nombre, tipos, entry } = datos

    const { color } = poke_info_functions()

    const gradientStyle = {
        background: 
        tipos.length == 2 ? 
        'linear-gradient(to right,' + color(tipos[0]) + ',' + color(tipos[1]) + ')': 
        'linear-gradient(to left,' + color(tipos[0]) + ',' + color(tipos[0]) + ')',
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            siguietePoke(+1);
        } else if (event.key === 'ArrowLeft') {
            siguietePoke(-1);
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
        color()
    }, [siguietePoke])

    return (
        <>
            <div className="poke_info_container" style={gradientStyle}>
                <Nav_bar id={id} funcion={siguietePoke}/>
                <i onClick={() => siguietePoke(-1)} className="bi bi-caret-left arrows"></i>
                <div className="pokemon_img_container">
                    <IdNumber id={id}/>
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
                    <p className="pk_nro">#{id}</p>
                    <div className="entry_container">
                        <p>
                            {entry}
                        </p>
                    </div>
                </div>
                <i onClick={() => siguietePoke(+1)} className="bi bi-caret-right arrows"></i>
            </div>
        </>
    )
}