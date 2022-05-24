import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meals.css"
import axios from 'axios';


class Meals extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchField: ""
        }
    }

    handleClick(event){
        event.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
            params: {query: this.state.searchField, number: '10', offset: '0'},
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '51be17977amsh1e7b4aa1af671dep16977ajsn18b85345a72c'
            }
          };
          axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    }

    render() {
        return (
            <div class="container" id="meals-container">
                <form id="mealsearch-form">
                
                    <div class="form-outline mb-4 input-group inner-addon right-addon">
                        
                        <input type="text"  id="mealsearch" placeholder='Search for any meal!' onChange={event => this.setState({searchField: event.target.value})}/>
                        
                        
                        {/* <span class="input-group-btn">
                            <button class="btn btn-primary" type="button"></button>
                        </span> */}
                        
                    </div>
                    <span class="input-group-btn">
                        <button class="search-icon" type="submit" onClick={event => this.handleClick(event)}></button>
                    </span>
                </form>
                
                                    
            </div>

                            
        )
    }
}

export default Meals;