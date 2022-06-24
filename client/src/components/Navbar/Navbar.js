import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../newlogo.png";
import "./navbar.css"


export default class Navbar extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: ""
    }
  }
  componentDidMount(){
    const config = {
      headers: {
          "x-access-token": localStorage.getItem("token")
      }
    }
    axios.get('/user/isUserAuth', config)
      .then(res => {
        this.setState({user: res.data.username})
      })
  }
  render(){
    return (
        <div>
          <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#13161d" }}>
                <Link to="/" class="navbar-brand">
                  <img class="d-inline-block align-middle" alt="Logo" src={logo} width="45" height="45"></img>
                  <span class="navbar-brand-text">BetterMeals</span>
                </Link>
                <div class="collapse navbar-collapse">
                  <ul class="nav navbar-nav navbar-right">
                    <li class='nav-item'><Link class="nav-link" to="/">Current Plan</Link></li>
                    <li class='nav-item'><Link class="nav-link" to="/meals">Meals</Link></li>
                    <li class='nav-item'><Link class="nav-link" to="/mealplans">Meal Plans</Link></li>
                  </ul>
                </div>
                <div class="justify-content-end navbar-collapse collapse">
                  <span class="logout-span"><button class="logout-btn" title='Logout' onClick={() => {localStorage.removeItem("token"); window.location="/login"}}></button></span>
                  <span class="navbar-text">
                      {"Logged in as " + this.state.user}
                  </span>
                </div>
          </nav>
        </div>
        
      
    )
  }
}