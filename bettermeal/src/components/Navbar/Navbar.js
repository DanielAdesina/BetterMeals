import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MealPlan from './components/MealPlan/MealPlan'

export default class Navbar extends Component {

  render() {
    return (
      <Router>
      <nav class="navbar navbar-expand navbar-light">
        <div class="container">
          <Link to="/" class="navbar-brand">
            <img class="d-inline-block align-top" alt="Logo" src="src/logo.png" width="30" height="30"></img>
            BetterMeal
          </Link>
          <div class="justify-content-end navbar-collapse collapse">
            <span class="navbar-text">
              <Link to=""></Link>
            </span>
          </div>
        </div>
      </nav>
      <Route path="/" exact component={TodosList} />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/create" component={CreateTodo} />
      </Router>
    );
  }
}