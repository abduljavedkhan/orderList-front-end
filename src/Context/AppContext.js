import React,{createContext,useState} from "react";
export const AppContext = createContext();
export const AppProvider = (props) =>{
    const [orderListRes, setOrderListRes] = useState([]);
    return(
        <AppContext.Provider value={{orderListRes, setOrderListRes}}>
            {props.children}
        </AppContext.Provider>
    )
}