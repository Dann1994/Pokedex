import React from 'react'

export const Pokemon = ({img}) => {
    if (img == '') {
        return (
            <>
                <img src="" alt="" />
            </>
        )
    } else {
        return (
            <>
                <img src={img} alt=""/>
            </>
        )
    }
    
}
