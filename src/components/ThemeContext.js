import React, { createContext, useState } from 'react'
export const ThemeContextProvider=createContext()
const ThemeContext = ({children}) => {
const [theme,setTheme]=useState('drak')
const toggleTheme=()=>
{
    setTheme(theme=='light'?'dark':'light')
}
  return (
    <ThemeContextProvider value={{theme,toggleTheme}}>
        {children}
    </ThemeContextProvider>
  )
}

export default ThemeContext