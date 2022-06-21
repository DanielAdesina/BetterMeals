import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, useHistory, Redirect, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MealPlan from "../MealPlan/MealPlan";
import Mealplans from "../Mealplans/Mealplans"
import Meals from "../Meals/Meals";
import Logout from "../Auth/Logout"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
// import useAuth from "../Auth/RequireAuth"
import CreateMeal from "../CreateMeal/CreateMeal";
import logo from "../newlogo.png"
import './background.css'
import axios from 'axios'
import Navbar from "../Navbar/Navbar";
import TodaysMeal from "./TodaysMeal"
import CurrentPlan from "./CurrentPlan"
import MealInfo from "../Meals/MealInfo"

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
      <div class="bg" style={{height: "100vh", overflow: "auto"}}>
        
        <Router>
          
          

            <Route exact path="/" render={() => <><Navbar></Navbar><CurrentPlan></CurrentPlan></>} />
            <Route exact path="/meals" render={() => <><Navbar></Navbar><Meals></Meals></>} />
            <Route exact path="/mealplans" render={() => <><Navbar></Navbar><div class="container" id="todaysplancontainer"><Mealplans></Mealplans></div></>} />
            <Route exact path="/mealplan/:id" component={MealPlan} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/meal/:id" component={MealInfo}></Route>
     
        </Router>

      </div>
      
    )
  }
}

export default App;