import {Routes, Route} from 'react-router-dom';
import { Home } from './Componentes/Home';
import { PokemonInfo } from './Componentes/PokemonInfo';


function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/' element={<PokemonInfo/>}/>
      </Routes>
    </>
  )
}

export default App
