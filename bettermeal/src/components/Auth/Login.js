import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useLocation, useHistory, Redirect,  useNavigate} from 'react-router-dom';



function Login(){
    const [loginMessage, setMessage] = React.useState("");
    const [usernameInput, setUsernameInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");
    const {state} = useLocation();

    function handleLogin(event){
        event.preventDefault();
        const user = {
            username: usernameInput,
            password: passwordInput
        }
        axios.post('http://localhost:5000/user/login', user)
            .then(res => {
                if(res.data.message === "Success"){
                    alert(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    axios.defaults.headers.common['x-access-token'] = res.data.token;
                    setMessage("")
                }
                else if(res.data.message === "Invalid Username or Password"){
                    axios.defaults.headers.common['x-access-token'] = null;
                    setMessage("Invalid Username or Password, please try again");
                }
            }).then(() => {window.location = "/";})
        
        
    }


    return(
        
        <div class="container" style={{width:'30vw'}}>
            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                    aria-controls="pills-login" aria-selected="true">Login</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                    aria-controls="pills-register" aria-selected="false">Register</a>
                </li>
            </ul>



            <div class="tab-content">
                <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>
                        <div class="form-outline mb-4">
                            <input name="username" type="email" id="loginName" placeholder="Username" class="form-control" onChange={event => setUsernameInput(event.target.value)} />
                        </div>

                        <div class="form-outline mb-4">
                            <input name="password" type="password" id="loginPassword" placeholder="Password" class="form-control" onChange={event => setPasswordInput(event.target.value)}/>
                        </div>

                
                        <button type="submit" class="shadow btn btn-primary btn-block mb-4" onClick={event => handleLogin(event)}style={{width:'100%'}}>Sign in</button>
                        
        

        
                        <div class="text-center">
                            <p>Not a member? <a href="#!">Register</a></p>
                            <span id="messageSpan">{loginMessage}</span>
                        </div>
                    </form>
                </div>
                {/* <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form>
                        <div class="text-center mb-3">
                            <p>Sign up with:</p>
                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <i class="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <i class="fab fa-google"></i>
                            </button>

                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <i class="fab fa-twitter"></i>
                            </button>

                            <button type="button" class="btn btn-link btn-floating mx-1">
                                <i class="fab fa-github"></i>
                            </button>
                        </div>
                        <p class="text-center">or:</p>
                        <div class="form-outline mb-4">
                            <input type="text" id="registerName" class="form-control" />
                            <label class="form-label" for="registerName">Name</label>
                        </div>

        
                        <div class="form-outline mb-4">
                            <input type="text" id="registerUsername" class="form-control" />
                            <label class="form-label" for="registerUsername">Username</label>
                        </div>

        
                        <div class="form-outline mb-4">
                            <input type="email" id="registerEmail" class="form-control" />
                            <label class="form-label" for="registerEmail">Email</label>
                        </div>

        
                        <div class="form-outline mb-4">
                            <input type="password" id="registerPassword" class="form-control" />
                            <label class="form-label" for="registerPassword">Password</label>
                        </div>

        
                        <div class="form-outline mb-4">
                            <input type="password" id="registerRepeatPassword" class="form-control" />
                            <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                        </div>

                        
                        <div class="form-check d-flex justify-content-center mb-4">
                            <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                            aria-describedby="registerCheckHelpText" />
                            <label class="form-check-label" for="registerCheck">
                            I have read and agree to the terms
                            </label>
                        </div>

        
                        <button type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
                    </form>
                </div> */}
            </div>
        </div>
    

    )
}


export default Login