import { useContext, useState, ReactNode, useEffect } from "react";
import { createContext } from "react";
import {UserContext} from "./UserContext"

export const TechContext = createContext({} as ITechContext)

interface ITechProviderProps{
  children:  ReactNode
}

interface ITechContext{
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void

}

export const TechProvider = ({children}:ITechProviderProps) =>{
    const {techs} = useContext(UserContext)

    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() =>{console.log(isOpen)},[isOpen])

    return (
        <TechContext.Provider
          value={{isOpen, setIsOpen}}
        >
          {children}
        </TechContext.Provider>
      );
}