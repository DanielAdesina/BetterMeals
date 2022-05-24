import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, useHistory, Redirect, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MealPlan from "../MealPlan/MealPlan";
import Mealplans from "../Mealplans/Mealplans"
import Meals from "../Meals/Meals";
import Logout from "../Auth/Logout"
import Login from "../Auth/Login"
// import useAuth from "../Auth/RequireAuth"
import CreateMeal from "../CreateMeal/CreateMeal";
import logo from "../newlogo.png"
import './background.css'
import axios from 'axios'
import Navbar from "../Navbar/Navbar";

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

function useAuth(){
  const [auth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const config = {
      headers:{
      "x-access-token": localStorage.getItem("token")
      }
  }
  
  axios.get('http://localhost:5000/user/isUserAuth', config)
      .then(res => {
          setAuth(res.data.isAuth);
          setUser(res.data.username)
      })
  return { auth, user }
}

function RequireAuth({ children }){
  const {auth, user} = useAuth();
  const history = useHistory();
  const location = useLocation();
  // alert("??");
  // console.log("HERE IT GOES, ITS GOING, GOING GREAT");
  console.log(auth); 
  return auth === true ? children : <Login />;

  // if(authorized === false){
  //     alert("sigh");
  //     history.push("/meals"); 
  // }
  // else{
  //     return children;
  // }
 

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
          
          

            <Route exact path="/" render={() => <><Navbar></Navbar><TodaysMeal></TodaysMeal></>} />
            <Route exact path="/meals" render={() => <><Navbar></Navbar><Meals></Meals></>} />
            <Route exact path="/mealplans" render={() => <><Navbar></Navbar><div class="container" id="todaysplancontainer"><Mealplans></Mealplans></div></>} />
            <Route exact path="/mealplan/:id" component={MealPlan} />
            <Route exact path="/login" component={Login}></Route>
     
        </Router>

      </div>
      
    )
  }
}

export default App;