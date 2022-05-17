import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MealPlan from "../MealPlan/MealPlan";
import Mealplans from "../Mealplans/Mealplans"
// import Meals from "../Meals/Meals";
import Logout from "../Logout/Logout"
import CreateMeal from "../CreateMeal/CreateMeal";
import logo from "../newlogo.png"
import './background.css'
import axios from 'axios'

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="container">
//           <div>
//             <nav class="navbar navbar-expand-lg navbar-light bg-light">
//               <div class="container">
//                 <Link to="/" class="navbar-brand">
//                   <img class="d-inline-block align-top" alt="Logo" src={logo} width="80" height="80"></img>
//                 </Link>
//                 <Link to="/" class="navbar-brand">
//                   BetterMeals
//                 </Link>
//                 <div className="collpase navbar-collapse">
//                   <ul className="navbar-nav mr-auto">
//                     <li className="navbar-item">
//                       <Link to="/" className="nav-link">Meal Plan</Link>
//                     </li>
//                     <li className="navbar-item">
//                       <Link to="/meals" className="nav-link">Meals</Link>
//                     </li>
//                   </ul>
//                 </div>
//                 <div class="justify-content-end navbar-collapse collapse">
//                   <span class="navbar-text">
//                     Logged in as Guest
//                   </span>
//                 </div>
//               </div>
//             </nav>
//           </div>
          
//           <Route path="/" exact component={MealPlan} />
//           <Route path="/meals" component={CreateMeal} />
//           <Route path="/logout" component={Logout} />
//         </div>
//       </Router>
//     );
//   }
// }

class Navbar extends Component{
  render(){
    const {updateFunc} = this.props

    return (
        <div>
          <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(48, 51, 54)" }}>
                
                <Link to="/" class="navbar-brand">
                  <img class="d-inline-block align-middle" alt="Logo" src={logo} width="45" height="45"></img>
                  <span class="navbar-brand-text">BetterMeals</span>
                </Link>
                <div class="collapse navbar-collapse">
                  <ul class="nav navbar-nav navbar-right">
                    <li class='nav-item'><Link class="nav-link" to="/" onClick={updateFunc}>Current Plan</Link></li>
                    <li class='nav-item'><Link class="nav-link" to="/meals" onClick={updateFunc}>Meals</Link></li>
                    <li class='nav-item'><Link class="nav-link" to="/mealplans">Meal Plans</Link></li>
                  </ul>
                </div>
                <div class="justify-content-end navbar-collapse collapse">
                  <span class="navbar-text">
                      Logged in as Guest
                  </span>
                </div>
          </nav>
        </div>
        
      
    )
  }
}

class TodaysMeal extends Component{
  render(){
    return (
      <>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary btn-lg">Today's Meals</button>
            <button type="button" class="btn btn-secondary btn-lg">Weekly Plan</button>
          </div>
          <div class="card text-center" id="breakfast">
            <div class="card-header">
              Breakfast
            </div>
            <div class="card-body">
              <h5 class="card-title">Random Meal</h5>
              <p class="card-text">A random meal that I created randomly, very cool</p>
              <a href="#" class="btn btn-primary">View Recipe</a>
            </div>
            <div class="card-footer text-muted">
              Basic Meal Plan #1
            </div>
          </div><div class="card text-center" id="lunch">
            <div class="card-header">
              Lunch
            </div>
            <div class="card-body">
              <h5 class="card-title">Random Meal #2</h5>
              <p class="card-text">A random meal that I created randomly, very cool</p>
              <a href="#" class="btn btn-primary">View Recipe</a>
            </div>
            <div class="card-footer text-muted">
              Basic Meal Plan #2
            </div>
          </div><div class="card text-center" id="dinner">
            <div class="card-header">
              Dinner
            </div>
            <div class="card-body">
              <h5 class="card-title">Random Meal #3</h5>
              <p class="card-text">A random meal that I created randomly, very cool</p>
              <a href="#" class="btn btn-primary">View Recipe</a>
            </div>
            <div class="card-footer text-muted">
              Basic Meal Plan #2
            </div>
          </div>
      </>
    )
  }
}

class Meals extends Component {
  render() {
      return (
          <div>
              <h1>Meal Plan!</h1>
              <p>Plan your meals out!</p>
          </div>
      )
  }
}


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
      <div class="bg">
        
        <Router>
          <Navbar updateFunc={this.pageChanged}></Navbar>
          <div class="container" id="todaysplancontainer">
            <Route path="/" exact component={TodaysMeal}></Route>
            <Route path="/meals" component={Meals}></Route>
            <Route path="/mealplans" component={Mealplans}></Route>
          </div>
          
          
          
          
          
        </Router>

      </div>
      
    )
  }
}

export default App;