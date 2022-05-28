import React, { Component, PureComponent } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meals.css"
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';
import Meal from './Meal';
import reactElementToJSXString from 'react-element-to-jsx-string';




class Meals extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchField: "",
            mealsResult: <></>,
            sanityCheck: "insane",
            clicked: false
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
        const storageCheck = JSON.parse(localStorage.getItem(this.state.searchField));
        // console.log(Date.now())
        // console.log(storageCheck.ttl)
        if(storageCheck && (Date.now() < storageCheck.ttl)){
            const mealArray = Array.from(storageCheck.results);
            this.setState({
                mealsResult: <div class="row row-cols-5">
                    {mealArray.map((meal) =>
                    <div class="col" style={{marginBottom: "2rem", height: "250px"}}><Meal id={meal.id}></Meal></div>)}
                </div>
            })
        }
        else{
            axios.request(options).then(response => {
                alert("broken, also spending...")
                response.data.ttl = Date.now() + (86400 * 1000);
                localStorage.setItem(this.state.searchField, JSON.stringify(response.data));
                const mealArray = Array.from(response.data.results);
                this.setState({
                    mealsResult: <div class="row row-cols-5">
                        {mealArray.map((meal) =>
                        <div class="col" style={{marginBottom: "2rem", height: "250px"}}><Meal id={meal.id} edit={false}></Meal></div>)}
                    </div>
                })
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    render() {

        return (
            <div class="container" id="meals-container">
                <form id="mealsearch-form">
                
                    <div class="form-outline mb-4 input-group inner-addon right-addon">
                        
                        <input type="text"  id="mealsearch" placeholder='Search for any meal!' value={this.state.searchField} onChange={event => {this.setState({searchField: event.target.value})}}/>
                        
                        
                        {/* <span class="input-group-btn">
                            <button class="btn btn-primary" type="button"></button>
                        </span> */}
                        
                    </div>
                    <span class="input-group-btn">
                        <button class="search-icon" type="submit" onClick={event => this.handleClick(event)}></button>
                    </span>
                </form>
                {/* <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealsModal"></button> */}
                
                {this.state.mealsResult}
                
                
                                    
            </div>

                            
        )
    }
}

export default Meals;