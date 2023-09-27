import React from 'react'

export const SelectRegion = ({regiones, region, funcion}) => {
    return (
        <>
            <select onChange={funcion} name="Region" className='region' value={region}>
                {
                    regiones.map( r => 
                        <option key={r} value={r}>{r}</option>
                    )
                }
            </select>
        </>
    )
}
