import React from 'react'

export const Nav_bar = ({id, funcion}) => {
    return (
        <>
            <header>
                <nav className='nav_bar'>
                    <i onClick={() => funcion(-1)} className="bi bi bi-caret-left-fill bi_bar"></i>
                    <h1>#{id}</h1>
                    <i onClick={() => funcion(+1)} className="bi bi-caret-right-fill bi_bar"></i>
                </nav>
            </header>
        </>
    )
}
