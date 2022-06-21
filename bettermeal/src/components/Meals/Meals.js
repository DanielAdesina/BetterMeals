import React, { Component, PureComponent } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meals.css"
import ReactDOMServer from 'react-dom/server'
import axios from 'axios';
import Meal from './Meal';
import config from "../../config.json";
import reactElementToJSXString from 'react-element-to-jsx-string';




class Meals extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchField: "",
            mealsResult: <></>,
        }
    }
    componentDidMount(){
        const config2 = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/user/isUserAuth', config2)
            .then(res => {
                if(res.data.isAuth === false){
                    window.location = "/login"; 
                }
            })
    }


    handleClick(event){
        event.preventDefault();
        const config2 = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/user/isUserAuth', config2)
            .then(res => {
                if(res.data.isAuth === false){
                    window.location = "/login"; 
                }
            })
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
            params: {query: this.state.searchField, number: '10', offset: '0'},
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': config['api-key']
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
                    <div class="col" style={{marginBottom: "2rem", height: "250px"}}><Meal id={meal.id} title={meal.title} mealClick={() => {}}></Meal></div>)}
                </div>
            })
        }
        else{
            axios.request(options).then(response => {
                response.data.ttl = Date.now() + (86400 * 1000);
                localStorage.setItem(this.state.searchField, JSON.stringify(response.data));
                const mealArray = Array.from(response.data.results);
                this.setState({
                    mealsResult: <div class="row row-cols-5">
                        {mealArray.map((meal) =>
                        <div class="col" style={{marginBottom: "2rem", height: "250px"}}><Meal id={meal.id} title={meal.title} mealClick={() => {}}></Meal></div>)}
                    </div>
                })
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    render() {
        const {searchField, mealsResult} = this.state
        return (
            <div class="container" id="meals-container">
                <form id="mealsearch-form">
                
                    <div class="form-outline mb-4 input-group inner-addon right-addon">
                        
                        <input type="text"  id="mealsearch" placeholder='Search for any meal!' value={this.state.searchField} 
                        onChange={event => {this.setState({searchField: event.target.value})}}/>
                        
                        
                        {/* <span class="input-group-btn">
                            <button class="btn btn-primary" type="button"></button>
                        </span> */}
                        
                    </div>
                    <span class="input-group-btn">
                        <button class="search-icon" type="submit" onClick={event => {this.setState({mealsResult: <></>}); this.handleClick(event)}}></button>
                    </span>
                </form>
                {/* <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealsModal"></button> */}
                
                {mealsResult}
                
                
                                    
            </div>

                            
        )
    }
}

export default Meals;