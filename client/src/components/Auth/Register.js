import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import "./login.css"


function Register(){
    const [loginMessage, setMessage] = React.useState("");
    const [usernameInput, setUsernameInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");

    function handleRegister(event){
        event.preventDefault();
        const user = {
            username: usernameInput,
            password: passwordInput
        }
        axios.post('http://localhost:5000/user/register', user)
            .then(res => {
                if(res.data.message === "user added successfully"){
                    localStorage.setItem("token", res.data.token);
                    axios.defaults.headers.common['x-access-token'] = res.data.token;
                    setMessage("");
                    window.location = "/login"
                }
                else if(res.data.message === "Invalid Username or Password"){
                    axios.defaults.headers.common['x-access-token'] = null;
                    setMessage("Username already taken");
                }
            })
        
        
    }


    return(
        <div class="loginbg" style={{height: "100vh", overflow: "auto"}}>

        
            <div class="container" style={{minWidth: "250px", width:'20vw', top: '10vh', position: 'relative', display: 'block', margin: 'auto', backgroundColor: "#13161d", borderRadius: '2rem'}}>
                



                
                    
                        <form autoComplete='off' style={{paddingTop: "2vh", paddingBottom: "2vh", paddingLeft: "1vw", paddingRight: "1vw"}}>
                            <div class="form-outline mb-4">
                                <h1 style={{textAlign: "center", color: '#a60004', fontFamily: "Lexend"}}>Register</h1>
                            </div>

                            <div class="form-outline mb-4">
                                <input name="username" type="email" id="loginName" placeholder="Username" class="form-control" onChange={event => setUsernameInput(event.target.value)} />
                            </div>

                            <div class="form-outline mb-4">
                                <input name="password" type="password" id="loginPassword" placeholder="Password" class="form-control" onChange={event => setPasswordInput(event.target.value)}/>
                            </div>

                    
                            <button id="signin" type="submit" class="shadow btn btn-primary btn-block mb-4" onClick={event => handleRegister(event)}style={{width:'100%'}}>Sign up</button>
                            
            

            
                            <div class="text-center">
                                <p style={{color: "whitesmoke"}}>Already a member? <a style={{color: '#a60004'}} href="/login">Login</a></p>
                                <span style={{color: "whitesmoke"}} id="messageSpan">{loginMessage}</span>
                            </div>
                        </form>
            </div>
        </div>
    

    )
}


export default Register