import React, { Component } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from "react-router-dom";

class MealSnippet extends Component{
    constructor(props){
        super(props);
        this.state = {
            meal: {},
            summary: ""
        }
    }

    loadContents = () => {
        const id = this.props.id

        let meal = {}
        let summary = ""

        const storageCheck = JSON.parse(localStorage.getItem(id));
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + id + '/information',
            headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': config["api-key"]
            }
        };
        if(id === ""){
            this.setState({meal: {}})
        }
        else{
            if(storageCheck && (Date.now() < storageCheck.ttl)){
                
                meal = storageCheck
                summary = storageCheck.summary
                this.setState({meal: storageCheck, summary: storageCheck.summary})
                
            }
            else{
                axios.request(options).then(res => {
                    res.data.ttl = Date.now() + (86400 * 1000);
                    localStorage.setItem(id, JSON.stringify(res.data));
                    meal = res.data
                    summary = res.data.summary
                    this.setState({meal: res.data, summary: res.data.summary})
                            
                }).catch(err => {
                    console.error(err)
                })
            }
        }
        return [meal, summary]
    }

    componentDidMount(){

        this.loadContents()
        
    }

    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id) {

            this.loadContents()
            console.log(this.state.meal.title)
        }

    }


    render(){
        const id = this.props.id
        let meal = this.state.meal
        let summary = this.state.summary

        let pFontSize = 15
        let mealLink = <Link to={"/meal/" + this.props.id} class="btn"
        style={{borderRadius: "1rem", backgroundColor: "lightblue", width: "100%", color: "black", fontWeight: "bold", margin: "auto", display: "block", marginBottom: "8px"}}>View More</Link>

        if(this.props.id === ""){
            pFontSize = 20;
            mealLink = <></>
        }

        if(id === ""){
        
        
            summary = "No Meal Selected"
            
        }

        return(
            <>
                <img alt="Meal" style={{width: "278px", height: "185px"}} src={"https://spoonacular.com/recipeImages/" + meal.id + "-556x370.jpg"} 
                align="left" class="col-md-8 float mb-3 mt-3 me-5"></img>
                <h2 style={{marginTop: "1vh"}}>{meal.title}</h2>
                <p style={{margin: "2vw", fontSize: pFontSize + "px"}} dangerouslySetInnerHTML={{__html: summary}}></p>
                {mealLink}
            </>
        )
        

        
       
    }
}

export default MealSnippet;