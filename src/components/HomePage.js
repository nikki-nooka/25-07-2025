import React, { useContext } from 'react'
import NavBar from './NavBar'
import { ThemeContextProvider } from './ThemeContext'
import './theme.css'
const HomePage = () => {
const {theme}=useContext(ThemeContextProvider)
  return (
    <div className={`container ${theme=='light'?'dark':'light'}`}>
        <NavBar/>
        <h2>{theme=='light'?'your theme is light':'your theme is dark'}</h2>
    </div>
  )
}

export default HomePage