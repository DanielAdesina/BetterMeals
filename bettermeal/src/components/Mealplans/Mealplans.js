import React, { Component } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mealplans.css"
import { Link, Redirect, Router, useHistory } from 'react-router-dom';
import { useAuth } from '../Auth/RequireAuth';

class Mealplans extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            mealplanNames: [],
            authorized: false
        }
        this.onClickHandler = this.onClickHandle.bind(this)
    }
    onClickHandle = (event) =>{
         alert();
         event.stopPropagation();
         return <Mealplans></Mealplans>

    }

    linkHandler = (event) =>{
        if(event.target.tagName.toLowerCase() != 'a'){
            event.preventDefault();
        }
    }

    editRedirect = () => {
        window.location = "/meals";
    }

   
    componentDidMount(){
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/mealplan', config)
        .then(res => {
            if(res.data.isAuth === false){
                window.location = "/login"; 
            } 
            const mealplans = Array.from(res.data);
            console.log(mealplans);
            this.setState({
                mealplanNames: mealplans.map((plan) => 
                <Link to={"/mealplan/" + plan._id} class="list-group-item list-group-item-action d-flex justify-content-between border-end-0 border-start-0" onClick={this.linkHandler}>
                    {plan.name}
                    <span>
                        <span class="btn edit-button" onClick={this.editRedirect}></span>
                        {/* <span class="btn edit-button" onClick={this.editRedirect}></span> */}
                        <span href="" class="btn delete-button"></span>
                    </span>
                    
                </Link>)
            });
        })
        // console.log(this.state.mealplanNames)
    }
        
    render() {
        return (
            <div class="container" id="MealplansContainer">
                <h2>Meal Plans</h2>
                {/* <hr /> */}
                <div class="list-group list-group-flush">
                    {this.state.mealplanNames}
                </div>
                <button class="add-more-button"type="button"></button>
            </div>
           
            
            
        )
    }
}

export default Mealplans