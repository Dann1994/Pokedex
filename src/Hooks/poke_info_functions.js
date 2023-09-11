import { useState } from "react";


export default function poke_info_functions() {

    const [gradientStyle, setGradientStyle] = useState()

    const crearGradiente = (tipos) => {
        const gradiente = {
            background: 
            tipos.length == 2 ? 
            'linear-gradient(to right,' + color(tipos[0]) + ',' + color(tipos[1]) + ')': 
            'linear-gradient(to left,' + color(tipos[0]) + ',' + color(tipos[0]) + ')',
        }
        setGradientStyle(gradiente)
    };

    const color = (tipo) => {
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

    return {
        color,
        gradientStyle,
        crearGradiente
    }
}
