import React from 'react'
import { useAuth } from '../Contexto/authContext'

export const BarNavHome = () => {
    
    const { idioma, buscar, cambiarIdioma, cambiarRegion, region, regiones, idiomas } = useAuth() 

    const filtrar = ({target}) => {
        const { value } = target
        setFiltro(value.trim());
    }

    return (
        <>
            <header className='header_home'>
                <nav className='nav_home'>
                    <i class="bi bi-list menu"></i>
                    <img className='grid_nav_item ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon"/>
                    <input className='buscador' onChange={buscar} type="text" />

                    <div>
                        <select onChange={cambiarRegion} name="Region" className='region' value={region}>
                            {
                                regiones.map( r => 
                                    <option key={r} value={r}>{r}</option>
                                )
                            }
                        </select>
                        <select onChange={cambiarIdioma} className='lenguage' name="idioma" value={idioma}>
                            {
                                idiomas.map( i => 
                                    <option key={i} value={i}>{i}</option>
                                )
                            }
                        </select>
                    </div>

                    <i class="bi bi-search buscar"></i>
                </nav>
            </header>
        </>
    )
}
