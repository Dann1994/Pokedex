import {Routes, Route} from 'react-router-dom';
import { Home } from './Componentes/Home';
import { PokemonInfo } from './Componentes/PokemonInfo';
import { AuthProvider } from './Contexto/authContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/poke_info' element={<PokemonInfo/>}/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
