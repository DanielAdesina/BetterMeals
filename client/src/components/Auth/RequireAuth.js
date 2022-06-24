import * as React from "react";
import axios from "axios";

const authContext = React.createContext();

export function useAuth(){
    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const config = {
        headers:{
        "x-access-token": localStorage.getItem("token")
        }
    }
    
    axios.get('/user/isUserAuth', config)
        .then(res => {
            setAuth(res.data.isAuth);
            setUser(res.data.user.username)
        })
    return { auth, user }
}


export function AuthProvider({ children }){
    const {auth, user} = useAuth()

    return <authContext.Provider value={{auth, user}}>{children}</authContext.Provider>
}


export default function AuthConsumer(){
    React.useContext(authContext);
}
