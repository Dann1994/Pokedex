import React, { useEffect, useState } from 'react'
import Api_conection from '../Hooks/Api_conection'
import { useNavigate } from 'react-router-dom'
import poke_info_functions from '../Hooks/poke_info_functions'
import { useAuth } from '../Contexto/authContext'


export const PokeCard = ({nro}) => {

    const navigate = useNavigate()

    const { reiniciarDatos } = useAuth()

    const { pokeDatos, cambiarPoke } = Api_conection()

    const { gradientStyle, crearGradiente } = poke_info_functions()

    const [poke, setPoke ] = useState({
        nombre: '---',
        imagen: '',
        tipos: []
    })

    const obt = async () => {
        const data = await pokeDatos("https://pokeapi.co/api/v2/pokemon/" + nro)
        const {nombre, imagen, tipos} = data

        setPoke({  
            nombre: nombre,
            imagen: imagen,
            tipos: tipos
        })
        console.log(tipos); 
    } 


    const selectPoke = (nro) => {
        reiniciarDatos()
        cambiarPoke(nro)
        navigate('/poke_info')
    }

    useEffect(() => { 
        obt() 
        crearGradiente(poke.tipos)
    }, [poke])
    
    
    return (
        <div onClick={() => selectPoke(nro)} className='poke_card' style={gradientStyle}>
            <h3>#{nro}</h3>
            <h2 className='poke_num'>{poke.nombre.toUpperCase()}</h2>
            {
                poke.imagen !== '' ?
                <img className='poke_img_card' src={poke.imagen} alt="" /> :
                <div class="spinner-border spinner" role="status">
                    <span class="sr-only"></span>
                </div>
            }
        </div>
    )
}
