import React, { useEffect, useState } from 'react'
import Api_conection from '../Hooks/Api_conection'
import { useNavigate } from 'react-router-dom'
import poke_info_functions from '../Hooks/poke_info_functions'
import { useAuth } from '../Contexto/authContext'
import { Tipos } from './Tipos'


export const PokeCard = ({nro}) => {

    const navigate = useNavigate()

    const { idioma, filtro, region, cambiarPokemon } = useAuth()

    const { crearGradiente, gradientStyle } = poke_info_functions()

    const { pokemonDatos, guardarDatosPokemon } = Api_conection()

    const { tipos, id, nombre, imagenes} = pokemonDatos

    const filtrar = () => {
        const info = nombre.toUpperCase()
        const filtrardo = filtro.toUpperCase()
        return info.includes(filtrardo) || id == filtrardo
    }

    const selectPoke = (nro) => {
        if (nombre !== '???') {
            cambiarPokemon(nro)
            navigate('/poke_info')
        }
    }

    useEffect(() => { 
        guardarDatosPokemon( nro, idioma, region)
    }, [idioma, region]) 

    useEffect(() => {
        crearGradiente(tipos) 
    }, [tipos])
    
    return (
        <>
            { filtrar() &&
                <div onClick={() => selectPoke(id)} className="poke_card" style={gradientStyle} >
                    <h3>#{id}</h3>
                    <h2 className='poke_num'>{nombre.toUpperCase()}</h2>
                    <Tipos tipos={tipos}/>
                        {
                            imagenes !== '' ?
                            <img className='poke_img_card' src={imagenes.front_default} alt="" /> :
                            <div className="spinner-border spinner" role="status">
                                <span className="sr-only"></span>
                            </div>
                        }
                </div>
            }
        </>
    )
}
