import * as React from "react";
import axios from "axios";
import { useLocation, useHistory } from 'react-router-dom'

const authContext = React.createContext();

export function useAuth(){
    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState(null);
    alert("boo");
    const config = {
        headers:{
        "x-access-token": localStorage.getItem("token")
        }
    }
    
    axios.get('http://localhost:5000/user/isUserAuth', config)
        .then(res => {
            setAuth(res.data.isAuth);
            setUser(res.data.user.username)
        })
    return { auth, user }
}

// export function RequireAuth({ children }){
//     // const { authorized } = useAuth();
//     // const history = useHistory();
//     // alert("??");
//     // console.log("HERE IT GOES, ITS GOING, GOING GREAT");
//     return children;

//     // if(authorized === false){
//     //     alert("sigh");
//     //     history.push("/meals"); 
//     // }
//     // else{
//     //     return children;
//     // }
   

// }

export function AuthProvider({ children }){
    const {auth, user} = useAuth()

    return <authContext.Provider value={{auth, user}}>{children}</authContext.Provider>
}


export default function AuthConsumer(){
    React.useContext(authContext);
}
