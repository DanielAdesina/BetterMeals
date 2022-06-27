import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MealPlan from "../MealPlan/MealPlan";
import Mealplans from "../Mealplans/Mealplans"
import Meals from "../Meals/Meals";
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import './background.css'
import CustomNavbar from "../Navbar/CustomNavbar";
import CurrentPlan from "./CurrentPlan"
import MealInfo from "../Meals/MealInfo"


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentPage: "/"
    }
  }

  pageChanged = () => {
    this.setState({
      currentPage: ":|"
    })
  }
  render() {
    return(
      <div class="bg" style={{height: "100vh", overflow: "auto"}}>
        
        <Router>
          
          

            <Route exact path="/" render={() => <><CustomNavbar></CustomNavbar><CurrentPlan></CurrentPlan></>} />
            <Route exact path="/currentplan" render={() => <><CustomNavbar></CustomNavbar><CurrentPlan></CurrentPlan></>} />
            <Route exact path="/meals" render={() => <><CustomNavbar></CustomNavbar><Meals></Meals></>} />
            <Route exact path="/mealplans" render={() => <><CustomNavbar></CustomNavbar><div class="container" id="todaysplancontainer"><Mealplans></Mealplans></div></>} />
            <Route exact path="/mealplans/:id" component={MealPlan} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/meal/:id" component={MealInfo}></Route>
     
        </Router>

      </div>
      
    )
  }
}

export default App;