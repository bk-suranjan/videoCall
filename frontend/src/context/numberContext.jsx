import { createContext } from "react"

export  const Number = new createContext(null)


export const NumberContext = ({children}) =>{
    const  number = false;
    return (
        <Number.Provider  value={number}>
            {children}
        </Number.Provider>
    )
}