import { NavLink } from "react-router-dom"

export const MenuBar = () => {
  return (
    <div className="w3-bar w3-border w3-light-grey">
      <NavLink to='/Delete' className="w3-bar-item w3-button w3-dark-blue">Eliminar</NavLink>
      <NavLink to='/Mostrar' className="w3-bar-item w3-button w3-dark-blue">Mostrar</NavLink>
      <NavLink to='/Alta' className="w3-bar-item w3-button w3-dark-blue">Insertar</NavLink>
      <NavLink to='/Buscar' className="w3-bar-item w3-button w3-dark-blue">Buscar</NavLink>
    </div>
  )
}