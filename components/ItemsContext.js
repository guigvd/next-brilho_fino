import { createContext, useState } from "react";

 export const ItemsContext = createContext({})

export function ItemsContextProvider({children}){
    const [selectedItems, setSelectedItems] = useState([])

    return(
        <ItemsContext.Provider
            value={selectedItems}
        >
            {children}
        </ItemsContext.Provider>
    )
} 