import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../newlogo.png";
import "./navbar.css"
import { Navbar, Nav } from 'react-bootstrap';



export default class CustomNavbar extends Component{
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
            <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: "#13161d"}}>
                <Navbar.Brand href="/">
                    <img class="d-inline-block align-middle" alt="Logo" src={logo} width="45" height="45"></img>
                    <span class="navbar-brand-text">BetterMeals</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                 
                  <Nav style={{marginLeft: "38%"}}>
                      
                      <Nav.Link as={NavLink} to="/currentplan">Current Plan</Nav.Link>
                    
                  
                  
                    
                      <Nav.Link as={NavLink} to="/meals">Meals</Nav.Link>
                    
                  
                                      
                      <Nav.Link as={NavLink} to="/mealplans">Meal Plans</Nav.Link>
                    
                  </Nav>
                  <Nav className="me-auto" style={{width: "175px", marginLeft: "37%"}}>
                <span class="logout-span"><button class="logout-btn" title='Logout' onClick={() => {localStorage.removeItem("token"); window.location="/login"}}></button></span>
                  <span class="navbar-text">
                      {"Logged in as " + this.state.user}
                  </span>
                </Nav>

                 


                  
                  {/* <ul class="nav navbar-nav navbar-right">
                    <li class='nav-item'><Link class="nav-link" to="/">Current Plan</Link></li>
                    <li class='nav-item'><Link class="nav-link" to="/meals">Meals</Link></li>
                    <li class='nav-item'><Link class="nav-link" to="/mealplans">Meal Plans</Link></li>
                  </ul> */}
                </Navbar.Collapse>
                  
            </Navbar>
          {/* <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#13161d" }}>
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
          </nav> */}
        </div>
        
      
    )
  }
}