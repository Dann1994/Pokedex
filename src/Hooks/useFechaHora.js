import { useEffect, useState } from "react";

export default function useFechaHora() {
    /*******Fecha********/

    var fechaCompleta = new Date(); // Obtén la fecha actual

    var anio = fechaCompleta.getFullYear(); // Obtiene el año (YYYY)
    var mes = ("0" + (fechaCompleta.getMonth() + 1)).slice(-2); // Obtiene el mes (MM) y agrega un cero al principio si es necesario
    var dia = ("0" + fechaCompleta.getDate()).slice(-2); // Obtiene el día (DD) y agrega un cero al principio si es necesario

    var fecha = anio + "-" + mes + "-" + dia; // Formato YYYY-MM-DD

    /******Hora*********/
    const [ hora, setHora ] = useState( )

    const obtenerHora = () => {
        var fecha = new Date(); // Obtén la fecha y hora actual
        var horas = ("0" + fecha.getHours()).slice(-2); // Obtiene la hora (HH) y agrega un cero al principio si es necesario
        var minutos = ("0" + fecha.getMinutes()).slice(-2); // Obtiene los minutos (MM) y agrega un cero al principio si es necesario
        var segundos = ("0" + fecha.getSeconds()).slice(-2); // Obtiene los segundos (ss) y agrega un cero al principio si es necesario
        setHora(horas + ":" + minutos + ":" + segundos); // Formato HH:MM
    }

    useEffect(() => {
        setInterval(() => {
            obtenerHora()
            
        }, 1000)
    }, [])


    return {
        fecha,
        hora
    }
}
