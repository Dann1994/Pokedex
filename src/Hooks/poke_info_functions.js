import { useState } from "react";
import { useAuth } from "../Contexto/authContext";


export default function poke_info_functions() {

    const { setIdioma } = useAuth()

    const [gradientStyle, setGradientStyle] = useState()

    const crearGradiente = (tipos) => {
        const gradiente = {
            background: 
            tipos.length == 2 ?  
            'linear-gradient(to right,' + color(tipos[0].id) + ',' + color(tipos[1].id) + ')': 
            'linear-gradient(to left,' + color(tipos[0].id) + ',' + color(tipos[0].id) + ')',
        }
        setGradientStyle(gradiente)
    };

    const color = (tipo) => {
        var color = ''

        switch (tipo) {
        case 10:
            color = '#F43D3D'
            break;
        case 12:
            color = '#4DA325'
            break;
        case 11:
            color = '#4381EF'
            break;
        case 7:
            color = '#92A312'
            break;
        case 4: 
            color = '#933ECC'
            break;
        case 5:
            color = '#92501B'
            break;
        case 6:
            color = '#B1AA82'
            break;
        case 1:
            color = '#A0A2A0'
            break;
        case 13:
            color = '#F2BF11'
            break;
        case 18:
            color = '#EB70EF'
            break;
        case 2:
            color = '#F59631'
            break;
        case 14:
            color = '#E73D7A'
            break;
        case 8:
            color = '#703F71'
            break;
        case 15:
            color = '#6DD9FD'
            break;
        case 16:
            color = '#4F60E2'
            break;
        case 9:
            color = '#60A2BA'
            break;
        case 17:
            color = '#4F3F3D'
            break;
        case 3:
            color = '#82BAF0'
            break;
        default:
            color = 'white'
            break;
        }
        return(color)
    }

    const cambiarIdioma = (idioma) => {
        setIdioma(idioma)
    }

    return {
        color,
        gradientStyle,
        crearGradiente
    }
}
