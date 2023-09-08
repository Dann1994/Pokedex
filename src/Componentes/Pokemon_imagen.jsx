import React from 'react'

export const Pokemon_imagen = ({img}) => {
    return (
        <>
        { img !== '' &&
            <img src={img}/>
        }

        { img == '' &&
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        </>
    )
}
