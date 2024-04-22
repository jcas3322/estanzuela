import React, {createContext, useState} from 'react'

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [ciudadanoLogueado, setCiudadanoLogueado] = useState({})

    return(
        <GlobalContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                ciudadanoLogueado,
                setCiudadanoLogueado
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalContext