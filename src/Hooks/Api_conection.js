import { useEffect, useState } from "react"

export default function Api_conection() {
    const [ id, setId ] = useState(1)
    const [datos, setDatos] = useState({
        imagen: '',
        nombre: '',
        tipos: ['?'],
        entry: ''
    })

    const get_data = async (url) => {
        const peticion = await fetch(url)
        const data = await peticion.json()
        return data
    }

    const get_types = async (data) => {
        const { types } = data
        const tipos = types.map( tipo => 
            tipo.type.name
        )
        return tipos
    }

    const get_entry = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + id
        const { flavor_text_entries } = await get_data(url)
        const entry = flavor_text_entries.find( ent => ent.language.name == "es")
        return entry.flavor_text
    }
    
    const respuesta = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon/" + id
        const data = await get_data(url)
        const tipos = await get_types(data)
        const entry = await get_entry()
        const {sprites, name} = data
        
        setDatos({
            ...[datos],
            imagen: sprites.front_default,
            nombre: name,
            tipos: tipos,
            entry: entry
        })
    }

    const siguietePoke = (cant) => {
        setDatos({
            ...[datos],
            imagen: '',
            nombre: '---',
            tipos: datos.tipos,
            entry: ''
        })
        setId( Math.max(1, id + cant))
    }

    useEffect(() => {
        respuesta()
    }, [id])


    return { respuesta, datos, siguietePoke, id} 
}


