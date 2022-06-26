import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import emptysign from "../MealPlan/emptyplate.webp"
import MealsModal from "./MealsModal";
import { Link } from "react-router-dom";

class Meal extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            meal: {title: ""}
        }
    }
        
    

    getInfo(){
        if(this.props.id !== ""){
            const storageCheck = JSON.parse(localStorage.getItem(this.props.id));
            const options = {
                method: 'GET',
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + this.props.id + '/information',
                headers: {
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.APIKEY
                }
            };
            if(storageCheck && (Date.now() < storageCheck.ttl)){
                
                this.setState({meal: storageCheck})
            }
            else{
            
                axios.request(options).then(res => {
                    res.data.ttl = Date.now() + (86400 * 1000);
                    localStorage.setItem(this.props.id, JSON.stringify(res.data));
                    this.setState({meal: res.data})
                    
                }).catch(err => {
                    console.error(err)
                })
            }
            
        }
        
    }
    
    showModalClick = () => {
        this.setState({
            showModal: true
        })
    }

    render(){
        let imageUrl = emptysign
        let viewMeal = <a href="#" style={{color: "rgb(41, 198, 254)"}}> View Meal</a>
        let mealTitle = "No Meal"
        let changeMealFunc = (newMeal) => {}
        if(this.props.id !== ""){
            imageUrl = "https://spoonacular.com/recipeImages/" + this.props.id + "-240x150.jpg"
            viewMeal = <Link to={"/meal/" + this.props.id} style={{color: "rgb(41, 198, 254)"}}> View Meal</Link>
            mealTitle = this.props.title
        
        }
        let search = <></>
        if(this.props.edit){
            search = <button class="btn edit-meal-button" title="Change Meal" onClick={this.showModalClick}></button>
            changeMealFunc = this.props.changeMealFunc
        }
        return(
            <div class="card h-100" style={{width: "170px", backgroundColor: "#13161d", color: "whitesmoke", marginBottom: "2rem"}} onClick={this.props.mealClick}>
                <img src={imageUrl} class="card-img-top" alt="..." />
                <div class="card-body" >
                    <h6 class="card-title">{mealTitle}</h6>
                    {viewMeal}
                    {search}
                    <MealsModal show={this.state.showModal} closeFunc={() => this.setState({showModal: false})} changeMealFunc={(id, title) => changeMealFunc(id, title)}></MealsModal>
                    
                </div>
            </div>
        )
    }
}

export default Meal;
