import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import emptysign from "../MealPlan/emptyplate.webp"

class Meal extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageUrl: emptysign,
            meal: {title: "No Meal"}
        }
        
    }

    componentDidMount(){
        const {id} = this.props;
        if(id !== ""){
            const options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information',
                headers: {
                  'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': '51be17977amsh1e7b4aa1af671dep16977ajsn18b85345a72c'
                }
            };
            
            axios.request(options).then(function (response) {
                this.setState({meal: response.data});
                this.setState({
                    imageUrl: "https://spoonacular.com/recipeImages/" + id + "-240x150.jpg"
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
        
    }
    render(){
        return(
            <div class="card" style={{width: "170px"}}>
                <img src={this.state.imageUrl} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h6 class="card-title">{this.state.meal.title}</h6>

                </div>
            </div>
        )
    }
}

export default Meal;
