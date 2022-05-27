import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import emptysign from "../MealPlan/emptyplate.webp"
import MealsModal from "./MealsModal";

class Meal extends Component{
    constructor(props){
        super(props)
        this.state = {
            // imageUrl: emptysign,
            // meal: {title: "No Meal"},
            // viewMeal: <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>,
            showModal: false
        }
        
    }

    // componentDidMount(){
    //     if(this.props.id !== ""){
    //         const storageCheck = JSON.parse(localStorage.getItem(this.props.id));
    //         const options = {
    //             method: 'GET',
    //             url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + this.props.id + '/information',
    //             headers: {
    //               'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //               'X-RapidAPI-Key': '51be17977amsh1e7b4aa1af671dep16977ajsn18b85345a72c'
    //             }
    //         };
    //         if(storageCheck && (Date.now() < storageCheck.ttl)){
    //             this.setState({
    //                 imageUrl: "https://spoonacular.com/recipeImages/" + this.props.id + "-240x150.jpg",
    //                 meal: storageCheck,
    //                 viewMeal: <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>
    //             })
    //         }
    //         else{
    //             axios.request(options).then(res => {
    //                 res.data.ttl = Date.now() + (86400 * 1000);
    //                 localStorage.setItem(this.props.id, JSON.stringify(res.data));
    //                 this.setState({
    //                     imageUrl: "https://spoonacular.com/recipeImages/" + this.props.id + "-240x150.jpg",
    //                     meal: res.data,
    //                     viewMeal: <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>
    //                 })
    //             }).catch(function (error) {
    //                 console.error(error);
    //             });
    //         }
        
    //     }
        
    // }

    showModalClick = () => {
        this.setState({
            showModal: true
        })
    }
    render(){
        let imageUrl = emptysign
        let meal = {title: "No Meal"}
        let viewMeal = <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>
        if(this.props.id !== ""){
            const storageCheck = JSON.parse(localStorage.getItem(this.props.id));
            const options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + this.props.id + '/information',
                headers: {
                  'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                  'X-RapidAPI-Key': '51be17977amsh1e7b4aa1af671dep16977ajsn18b85345a72c'
                }
            };
            if(storageCheck && (Date.now() < storageCheck.ttl)){
                
                imageUrl = "https://spoonacular.com/recipeImages/" + this.props.id + "-240x150.jpg"
                meal = storageCheck
                viewMeal = <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>
            }
            else{
                axios.request(options).then(res => {
                    res.data.ttl = Date.now() + (86400 * 1000);
                    localStorage.setItem(this.props.id, JSON.stringify(res.data));
                    imageUrl = "https://spoonacular.com/recipeImages/" + this.props.id + "-240x150.jpg"
                    meal = storageCheck
                    viewMeal = <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>
                }).catch(function (error) {
                    console.error(error);
                });
            }
        
        }
        return(
            <div class="card" style={{width: "170px", backgroundColor: "rgb(48, 51, 54)", color: "whitesmoke", marginBottom: "2rem"}}>
                <img src={imageUrl} class="card-img-top" alt="..." />
                <div class="card-body" >
                    <h6 class="card-title">{meal.title}</h6>
                    {viewMeal}
                    <button class="btn btn-primary" onClick={this.showModalClick}></button>
                    <MealsModal show={this.state.showModal}></MealsModal>
                    
                </div>
            </div>
        )
    }
}

export default Meal;
