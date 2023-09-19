import React from 'react'
import poke_info_functions from '../Hooks/poke_info_functions'

export const Tipos = ({tipos}) => {
    const { color } = poke_info_functions()
    return (
        <div className='tipos_container'>
            {
                tipos.map( t => 
                    <button style={{background: color(t.id)}} className='tipo' key={t.nombre}>{t.nombre}</button> 
                )
            }
        </div>
    )
}
