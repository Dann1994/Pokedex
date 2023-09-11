import { useEffect, useState } from "react"
import { useAuth } from "../Contexto/authContext"

export default function Api_conection() {

    /*
        Datos del contexto
    */
    const {
        idPoke,
        setIdPoke,
        pokemonDatos,
        setPokemonDatos,
        setTamanioApi
    } = useAuth()

    /*
        Obtiene datos de la api que se pase su url por parámetro.
        Devuelve un json.
    */
    const peticionApi = async (url) => {
        const peticion = await fetch(url)
        const datos    = await peticion.json()
        return datos
    }

    /*
        Obtiene los tipos desde los datos de un pokemon
    */
    const obtenerTipos = async (data) => {
        const { types } = data
        const tipos = types.map( tipo => 
            tipo.type.name
        )
        return tipos
    }

    /*
        Obtiene la entrada de la pokedex del pokemon actual.
    */
    const ObtenerEntrada = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon-species/" + idPoke
        const { flavor_text_entries } = await peticionApi(url)
        const entry = flavor_text_entries.find( ent => ent.language.name == "es") 
        return entry.flavor_text
    }

    /*
        Toma los datos de una petición a la url dada y devulve
        los datos necesarios del pokemon.
    */
    const pokeDatos = async (url) => {
        const peticion = await peticionApi(url)
        const { sprites, name} = peticion
        const imagen    = sprites.front_default
        const tipos     = await obtenerTipos(peticion)
        const entrada   = await ObtenerEntrada()

        const datos = {
            imagen: imagen,
            nombre: name,
            tipos:  tipos,
            entry:  entrada
        }

        return datos
    }

    /*
        Guarda los datos del pokemon obtenidos de la api en un estado local
    */
    const guardarPokeDatos = async () => {
        const datos = await pokeDatos("https://pokeapi.co/api/v2/pokemon/" + idPoke)
        setPokemonDatos(datos)
    }


    /*
        Cambia el id del pokemon actual al siguiente segund el número dado
        Si se usa "1" pasa al siguiete y con "-1" al anterior.
        Antes de cambiar, limpia los datos anteriores dejando unos genericos.
    */
    const siguientePoke = (cant) => {
        setPokemonDatos({
            imagen: '',
            nombre: '---',
            tipos: pokemonDatos.tipos,
            entry: ''
        })
        setIdPoke( Math.max(1, idPoke + cant))
    }

    /*
        Cambia el id del pokemon actual según el número dado.
    */
    const cambiarPoke = async (nro) => {
        setIdPoke(nro)
        await guardarPokeDatos()
    }

    const obtenerApiTamanio = async (url) => {
        const api = await peticionApi(url)
        const tamanio = api.count
        setTamanioApi(tamanio) 
    }

    return {
        siguientePoke,
        cambiarPoke,
        guardarPokeDatos,
        pokeDatos,
        obtenerApiTamanio
    } 
}


