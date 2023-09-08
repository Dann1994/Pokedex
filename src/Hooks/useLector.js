import { useEffect, useReducer, useRef, useState } from 'react'
import { useAuth } from '../Contexto/authContext'
import { arrayUnion, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

import useFechaHora from './useFechaHora'
import { datosReducer } from '../Reducers/DatosReducer'
import { useFirebase } from './useFirebase'

//Estado inicial del reduce
const initialState = []

//Si existen datos en el localStorage los toma, de lo contrario retorna un arreglo vacío.
const init = () => {
    return JSON.parse( localStorage.getItem('datosLocal')) || []
}

export const useLector = () => {

    //Custom hooks
    const { fecha, hora } = useFechaHora()

    const { obtenerDoc, obtenerDocs, actualizarSeries  } = useFirebase()

    const { linea, onlineStatus, checkOnlineStatus, color } = useAuth()

    //Estados
    const [ lectorAct, setLectorAct ] = useState(true)

    const [inputVacio, setInputVacio] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    //Datos del número de serie 
    const [ datosSerie, setDatosSerie ] = useState({
        Id    :  '',
        Fecha :  fecha,
        Hora  :  hora,
        Linea :  linea,
        Sku   :  '',
        Serie :  '',
        Estado:  'Pendiente'
    })

    //Refs
    const lectorRef = useRef()

    const lect = useRef(null)

    //Reducer
    const [ datosLocal, datosLocalAction ] = useReducer( datosReducer, initialState, init)

    //Constantes
    const nombre = 'LÍNEA ' + linea.substring(1, 2)


    //***************************Funciones de registro local **************************************

    
    //Escanea el serie ingresado en el input
    const escanear = async (e) => {
        e.preventDefault()
        checkOnlineStatus()
        desactivarLector()
        datosSerie.Estado = 'Pendiente'
        const serie = datosSerie.Serie

        const input = datosSerie.Serie.trim()
        console.log(input);

        if (input == '') {
            setInputVacio(true)
            activarLector()
        } else if ( await registradoLocal(serie)) {
            modalYaExite()
        } else {
            const action = {
                type: '[datos] agregar',
                payload: datosSerie
            }
            datosLocalAction(action)
            modalRegistrado()
            console.log(datosLocal);
        }
        console.log('Datos registrados localmente: ' + datosLocal)
    }

    //Verifica si el serie está registrado de forma local o en firebase
    const registradoLocal = async(serie) => {
        const series       = datosLocal.map(e => e.Serie)
        const enfirebase   = await registrado(serie);
        const enArrayLocal = series.includes(serie) 
        
        return enArrayLocal || enfirebase
    }

    //Escanea usando la cámara del dispositivo
    const escanearCam = ( serie ) => {
        lectorRef.current.value = serie
        lectorRef.current.value = serie
        datosSerie.Serie = serie
        escanear()
    }



    //***************************Funciones generales***********************************************

    //Observa los cambios de imput para guardar en los datos
    const observarCambios = ({target: {name, value}}) => {
        datosSerie.Fecha  = fecha
        datosSerie.Hora   = hora 
        datosSerie.Id     = new Date().getTime() 
        setInputVacio(false)
        setDatosSerie({...datosSerie, [name]: value.trim()})
    }


    //Verifica que se haya seleccionado un SKU
    const checkSKUSeleccionado = () => {
        if (datosSerie.Sku !== '') {
            setLectorAct(false)
        } else {
            setLectorAct(true)
        }
    }

    //Desactiva y limpia el lector
    const desactivarLector = () => {
        setLectorAct(true)
        lectorRef.current.value = ''
        lectorRef.current.text  = ''
    }

    //Vuelve a activar el lector
    const activarLector = () => {
        setTimeout(function() {
            setLectorAct(false)
        }, 2000)
        lectorRef.current.value = ''
        lectorRef.current.text  = ''
    }

    //Enfoca el input del lector
    const enfocarLector = () => {
        lectorRef.current.focus()
    }

    //Eliminaa los registros locales del dispositivo usado según el estado y línea dada.
    const eliminar = (estado, l) => {
        let nuevoRegistro = datosLocal
        if (estado != 'Todos') {
            nuevoRegistro = datosLocal.filter( e => e.Estado !== estado || e.Linea !== l)
            console.log('Se borraron los ' + {estado});
        } else {
            nuevoRegistro = datosLocal.filter( e => e.Linea !== l)
        }

        console.log('El nuevo registro es: ' + nuevoRegistro);
        const action = {
            type: '[datos] eliminar',
            payload: nuevoRegistro
        }
        datosLocalAction(action)
        localStorage.setItem('datosLocal', JSON.stringify(datosLocal));
    }


    //***************************Funciones firebase************************************************

    //Envia un objeto con los datos del escaneo 
    const enviarDatos = async (obj) => {
        checkOnlineStatus()
        const serie     = obj.Serie
        const cabecera  = obtenerCabecera(serie) 
        await crearDocumento(cabecera)

        const nroDocumentos = await documentosConCabecera(cabecera)//Cantidad de documetos con la cabecera dada.
        const ultimoDoc = cabecera + '-' + (nroDocumentos - 1)
        const serials = obtenerDoc("Series", ultimoDoc);

        if (await registrado(serie) && obj.Estado !== 'Enviado') {
            console.log('El serie ya existe');
            
            obj.Estado = 'Repetido'
        } else if(obj.Estado == 'Pendiente') {
            try {
                await actualizarSeries(serials, obj)
                obj.Estado = 'Enviado'
                console.log('El serie se registró con exito');
            } catch (error) {
                console.log(error);
            }
        }
        localStorage.setItem('datosLocal', JSON.stringify(datosLocal));
    }


    //Obtiene la cabecera de un serie la cual es las primeras 3 letras.
    const obtenerCabecera = (serie) => { 
        const cabecera = serie.substring(0, 3)
        console.log('La cabecera del objeto es: ' + cabecera );
        return cabecera
    }

    //Crea un documento nuevo si la cabecera dada no existe o si el ultimo doc con esa cabecera supera un límite de tamaño dado
    const crearDocumento = async (cabecera) => {
        const nroDocumentos = await documentosConCabecera(cabecera)//Cantidad de documetos con la cabecera dada.

        const nombreDoc = cabecera + '-' + nroDocumentos
        const docRef  = obtenerDoc("Series", nombreDoc) //Prepara datos para crear el doc con la cabecera y el número.
        const tamanio = await tamanioDoc(cabecera + '-' + (nroDocumentos - 1)) //Cantidad de registros del ultimo documento

        const confgInicial = {
            Cabecera: cabecera, 
            Nro: nroDocumentos, 
            Fecha: fecha, 
            Series: []
        }

        if ( nroDocumentos == 0 || tamanio >= 10000) {
            await setDoc(docRef, confgInicial);
        }
    }


    //Trae la cantidad de documentos que hay con la cabecera indicada
    const documentosConCabecera = async (cabecera) => {
        const docsConcabecera = await obtenerDocs('Series', 'Cabecera', cabecera)
        const nroDocumentos   = docsConcabecera.size;//Cantidad de documetos con la cabecera dada.

        console.log('Hay un total de ' + nroDocumentos + ' con la cabecera ' + cabecera);

        return nroDocumentos
    }

    //Devuleve la cantidad de registros que tiene un documento
    const tamanioDoc = async (cabecera) => {

        const docRef  = obtenerDoc("Series", cabecera)
        const docSnap = await getDoc(docRef);
        const series  = docSnap.data()?.Series 
        const tamanio = series?.length
        console.log('El tamaño del último documento es: ' + tamanio)

        return tamanio ;
    }


    //Varifica si el serie está registrado en firebase
    const registrado = async (serie) => {

        let   existe            = false 
        const cabecera          = obtenerCabecera(serie)  
        const docsConcabecera   = await obtenerDocs('Series', 'Cabecera', cabecera)

        docsConcabecera.forEach( e => {
            const series = e.data().Series.map( e => e.Serie)
            if (series.includes(serie)) {
                existe = true
            };  
        })

        console.log( 'El serie está registrado?: ' + existe);

        return existe;
    }


    //Verifica si hay algún objeto pnediente de ser enviado a firebase
    const hayEnEspera = () => {
        return datosLocal.some( e => e.Estado === 'Pendiente')
    }


    //*****Modales********************************************************************************

    //Modal que indica el número de serie se registró.
    const modalRegistrado = () => {
        sonido('ok')
        Swal.fire({
            icon: 'success',
            title: '¡Registrado!',
            showConfirmButton: false,
            timer: 1500
        }).then(
            activarLector()
        )
    }
    
    //Modal que indica el número que se intentó registrar ya fue registrado anteriormente.
    const modalYaExite = () => {
        sonido('error')
        Swal.fire({
            icon: 'error',
            title: '¡El serie ya fue registrado!',
            showConfirmButton: false,
            timer: 1500
        }).then(
            activarLector()
        )
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    

    //************************Efectos de sonido************************

    //Reproduce el sonido cuyo id pasemos por parámetro
    const sonido = (id) => {
        var audio = document.getElementById(id);
        audio.play();
    }
    

    //*****UseEffects********************************************************************************

    //Checkea si hay un SKU seleccionado
    useEffect(() => {
        checkSKUSeleccionado()
    }, [datosSerie.Sku])
    

    //Enfoca constantemente al input del lector y realiza checkeos para verificar si hay conexión a internet.
    useEffect(() => {
        enfocarLector()
    },[lectorAct, datosSerie])

    
    
    //Envía los datos guardados si es que hay conexión y hay datos cuyo estado es "Pendiente"
    //Solo cuando haya algun cambio en "onlineStatus", el objetivo es en el caso de haber perdido la conexión a internet 
    //enviar los datos a penas se recupere la conexión.
    const [ contador, setContador] = useState(0) 
    useEffect(() => {
        if (hayEnEspera() && onlineStatus) {
            const pendientes = datosLocal.filter( e => e.Estado == 'Pendiente')
            const cantEspera = pendientes.length
            if (cantEspera > 0) {
                const timeout = setTimeout(() => {
                    enviarDatos(pendientes[cantEspera - 1])
                    setContador(contador + 1)
                    pendientes.pop()
                }, 250);
            
                return () => {
                    clearTimeout(timeout);
                };
            }
        }
            
    },[enviarDatos])

    //Al renderizase la página verifica si hay conexión a internet.
    useEffect(() => {
        checkOnlineStatus()
    }, [datosLocal])

    //Guarda datos locales en el local storage siempre que haya cambios en los datos locales
    useEffect(() => {
        localStorage.setItem( 'datosLocal', JSON.stringify(datosLocal) )
    }, [datosLocal])

    //Cierra el modal de la cámara si hay un cambio en los datosSerie
    useEffect(() => {
        closeModal()
    }, [datosSerie])

    return {
        color,
        nombre,
        inputVacio,
        isOpen,
        lect,
        onlineStatus,
        lectorAct,
        lectorRef,
        datosLocal,
        linea,
        enfocarLector,
        hayEnEspera,
        escanear,
        escanearCam,
        observarCambios,
        eliminar,
        openModal
    }
}
