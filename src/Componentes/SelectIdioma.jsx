import React from 'react'

export const SelectIdioma = ({idiomas, idioma, funcion}) => {
    return (
        <>
            <select onChange={funcion} name="idioma" className='idioma' value={idioma}>
                {
                    idiomas.map( i => 
                        <option key={i} value={i}>{i}</option>
                    )
                }
            </select>
        </>
    )
}
