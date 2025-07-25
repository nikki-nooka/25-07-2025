import React, { useContext } from 'react'
import { ThemeContextProvider } from './ThemeContext'
const ToggleButton = () => {
const  {theme,toggleTheme}=useContext(ThemeContextProvider)
  return (
    <div>
      <button className={theme=='light'?'dark':'light'} onClick={()=>toggleTheme()}>{theme=='light'?'dark':'light'}</button>
    </div>
  )
}

export default ToggleButton