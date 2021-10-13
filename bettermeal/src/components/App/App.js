import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MealPlan from "../MealPlan/MealPlan";
import Meals from "../Meals/Meals";
import Logout from "../Logout/Logout"
import CreateMeal from "../CreateMeal/CreateMeal";
import logo from "../logo.png"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container">
                <Link to="/" class="navbar-brand">
                  <img class="d-inline-block align-top" alt="Logo" src={logo} width="80" height="80"></img>
                </Link>
                <Link to="/" class="navbar-brand">
                  BetterMeals
                </Link>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                      <Link to="/" className="nav-link">Meal Plan</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/meals" className="nav-link">Meals</Link>
                    </li>
                  </ul>
                </div>
                <div class="justify-content-end navbar-collapse collapse">
                  <span class="navbar-text">
                    Logged in as Guest
                  </span>
                </div>
              </div>
            </nav>
          </div>
          
          <Route path="/" exact component={MealPlan} />
          <Route path="/meals" component={CreateMeal} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

export default App;