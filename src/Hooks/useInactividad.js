import { useEffect, useState } from "react"
import { auth } from "../FireBase/Firebase";
import { signOut } from "firebase/auth";

const Inactividad = ({ logoutTimeout }) => {
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    const resetTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      // Inicia el temporizador nuevamente
      setLogoutTimer(setTimeout(logout, logoutTimeout));
    };

    const logout = () => {
        signOut(auth)
    };

    // Escucha los eventos para reiniciar el temporizador
    const events = ['mousemove', 'keydown'];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Elimina los event listeners cuando el componente se desmonte
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });

      // Limpia el temporizador al desmontar el componente
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [logoutTimer]);

  return <></>; // Puedes ocultar o no renderizar este componente, ya que solo se utiliza para controlar la inactividad
};

export default Inactividad;

