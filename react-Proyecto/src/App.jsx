import { Route, Routes, Navigate } from 'react-router-dom'
import { MenuBar } from './Proyecto_Final/MenuBar'
import { Delete } from './Proyecto_Final/Delete'
import { Mostrar } from './Proyecto_Final/Mostrar'
import { Alta } from './Proyecto_Final/Alta'
import { Buscar } from './Proyecto_Final/Buscar'
import './App.css'

function App() {
  return (
    <>
      <div className='w3-container'>
        <MenuBar />
        <Routes>
          <Route path="/Delete" element={<Delete/>}></Route>
          <Route path="/Mostrar" element={<Mostrar/>}></Route>
          <Route path="/Alta" element={<Alta/>}></Route>
          <Route path="/Buscar" element={<Buscar/>}></Route>
          <Route path="/*" element={<Navigate to='/' />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
