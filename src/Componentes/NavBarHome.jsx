import React from 'react'
import { useAuth } from '../Contexto/authContext'
import { SelectRegion } from './SelectRegion'
import { SelectIdioma } from './SelectIdioma'


export const BarNavHome = () => {
    
    const { idioma, buscar, cambiarIdioma, cambiarRegion, region, regiones, idiomas } = useAuth() 

    return (
        <>
            <header className='header_home'>
                <nav className='nav_home'>
                    <i className="bi bi-list menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"></i>
                    <img 
                        className='grid_nav_item ' 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" 
                        alt="Pokemon"
                    />
                    <div className='buscar_group'>
                        <input className='buscador' onChange={buscar} type="text" placeholder='Buscar' />
                        <i className="bi bi-search"></i>
                    </div>

                    <div>
                        <SelectRegion regiones={regiones} region={region} funcion={cambiarRegion}/>
                        <SelectIdioma idiomas={idiomas} idioma={idioma} funcion={cambiarIdioma}/>
                    </div>
                </nav>
            </header>
            <div class="offcanvas offcanvas-top" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <input className='buscador' onChange={buscar} type="text" placeholder='Buscar' />
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
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
                </div>
            </div>
        </>
    )
}
