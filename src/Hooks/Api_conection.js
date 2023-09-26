import { useState } from "react"

export default function Api_conection() {

    const datos = {
        imagenes: '',
        id: '?',
        nombre: '???',
        color: 'white',
        entrada: '---',
        specie: 'Pokemon',
        tipos: [ { nombre: '?', id: 0 } ]
    }

    const [ pokemonDatos, setPokemonDatos ] = useState(datos)

    const peticionApi = async (url) => {
        const peticion = await fetch(url)
        const datos    = await peticion.json()
        return datos
    }

    const obtenerRegiones = async () => {
        const peticion = await peticionApi('https://pokeapi.co/api/v2/pokedex/')
        const { results } = peticion
        const nombres = results.map( r => r.name)
        return nombres
    }

    const obtenerIdiomas = async () => {
        const peticion = await peticionApi('https://pokeapi.co/api/v2/language/')
        const { results } = peticion
        const idiomas = results.map( r => r.name)
        return idiomas
    }

    const obtenerNombres = async (region) => {
        const peticion = await peticionApi('https://pokeapi.co/api/v2/pokedex/' + region + '/')
        const entradas = peticion.pokemon_entries
        const nombres = entradas.map( n => n.pokemon_species.name)
        return(nombres);
    }

    const obtenerDeEspecie = async (url) => {
        const peticion = await peticionApi(url)
        return peticion
    }

    const obtenerTipos = async (nombres, idioma) => {
        const tipos = [] 
        for (let i = 0; i < nombres.length; i++) {
            const obj = await peticionApi('https://pokeapi.co/api/v2/type/' + nombres[i])
            const names = obj.names
            const tipo = names.find( t => t.language.name == idioma)
            const id = obj.id
            
            tipos.push({
                nombre: tipo.name,
                id: id
            })
        }
        return (tipos);
    }

    const obtenerDatosDePokemon = async (pokemon, idioma, region) => {

        const datosEscie = await peticionApi('https://pokeapi.co/api/v2/pokemon-species/' + pokemon)

        const { names, color, flavor_text_entries, genera, pokedex_numbers } = datosEscie
        const numero = pokedex_numbers.find( n => n.pokedex.name == region)
        const id = numero.entry_number
        const nombre = names.find( e => e.language.name == idioma).name
        const entrada = flavor_text_entries.find( e => e.language.name == idioma).flavor_text
        const especie = genera.find( e => e.language.name == idioma).genus

        const datosPokemon = await obtenerDeEspecie('https://pokeapi.co/api/v2/pokemon/' + pokemon)
        const { sprites, types } = datosPokemon
        const tiposUrls = types.map( t => t.type.name)  
        const tipos = await obtenerTipos(tiposUrls, idioma)

        const datos = {
            imagenes: sprites,
            id: id,
            nombre: nombre,
            color: color.name,
            entrada: entrada,
            specie: especie,
            tipos: tipos
        }
        return(datos);
    }

    const guardarDatosPokemon = async ( pokemon, idioma, region) => {
        const datos = await obtenerDatosDePokemon( pokemon, idioma, region )
        setPokemonDatos(datos)
    }

    return {
        obtenerNombres,
        obtenerRegiones,
        obtenerIdiomas,
        obtenerDatosDePokemon,
        guardarDatosPokemon,
        pokemonDatos
    } 
}


