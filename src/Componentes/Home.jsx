import { useEffect, useState } from 'react'
import Api_conection from '../Hooks/Api_conection'
import { Pokemon_imagen } from './Pokemon_imagen'
import { Nav_bar } from './Nav_var'


export const Home = () => {
    const { datos, siguietePoke, id } = Api_conection()

    const { imagen, nombre, tipos, entry } = datos

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            siguietePoke(+1);
        } else if (event.key === 'ArrowLeft') {
            siguietePoke(-1);
        }
    };

    const fondo = (tipo) => {
        var color = ''

        switch (tipo) {
        case 'fire':
            color = '#F43D3D'
            break;
        case 'grass':
            color = '#4DA325'
            break;
        case 'water':
            color = '#4381EF'
            break;
        case 'bug':
            color = '#92A312'
            break;
        case 'poison':
            color = '#933ECC'
            break;
        case 'ground':
            color = '#92501B'
            break;
        case 'rock':
            color = '#B1AA82'
            break;
        case 'normal':
            color = '#A0A2A0'
            break;
        case 'electric':
            color = '#F2BF11'
            break;
        case 'fairy':
            color = '#EB70EF'
            break;
        case 'fighting':
            color = '#F59631'
            break;
        case 'psychic':
            color = '#E73D7A'
            break;
        case 'ghost':
            color = '#703F71'
            break;
        case 'ice':
            color = '#6DD9FD'
            break;
        case 'dragon':
            color = '#4F60E2'
            break;
        case 'steel':
            color = '#60A2BA'
            break;
        case 'dark':
            color = '#4F3F3D'
            break;
        case 'flying':
            color = '#82BAF0'
            break;
        default:
            color = 'white'
            break;
        }
        return(color)
    }

    const gradientStyle = {
        background: 
        tipos.length == 2 ? 
        'linear-gradient(to right,' + fondo(tipos[0]) + ',' + fondo(tipos[1]) + ')': 
        'linear-gradient(to right,' + fondo(tipos[0]) + ',' + fondo(tipos[0]) + ')',
        padding: '10px',
        color: 'white', 
    };
    

    useEffect(() => {
        fondo()
    }, [siguietePoke])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <>
            <div className='dex_container' style={gradientStyle}>
                <div className='header_container'>
                    <Nav_bar id={id} funcion={siguietePoke}/>
                </div>
                <div className='poke_image'>
                    <div className='poke_name'>
                        <h1>{nombre.toUpperCase()}</h1>
                        <button style={{background: fondo(tipos[0]) }} className='tipo_item'>
                            {tipos[0].toUpperCase()}
                        </button>
                        {
                            tipos.length == 2 &&
                            <button style={{background: fondo(tipos[1]) }} className='tipo_item'>
                                {tipos[1].toUpperCase()}
                            </button>
                        }
                    </div>
                    <div className='imagen_container'>
                        <Pokemon_imagen img={imagen}/>
                    </div>
                </div>
                <div className='data_container'>
                    <p>{entry}</p>
                </div>
            </div>
        </>
    )
}
