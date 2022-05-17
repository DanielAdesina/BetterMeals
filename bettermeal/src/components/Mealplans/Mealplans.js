import React, { Component } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mealplan.css"
import { Link, Router } from 'react-router-dom';

class Mealplans extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            mealplanNames: []
        }
        this.onClickHandler = this.onClickHandle.bind(this)
    }
    onClickHandle = (event) =>{
         alert();
         event.stopPropagation();

    }

    linkHandler = (event) =>{
        if(event.target.tagName.toLowerCase() != 'a'){
            event.preventDefault();
        }
    }

   


    componentDidMount(){
        axios.get('http://localhost:5000/mealplan')
        .then(res => {
            const mealplans = Array.from(res.data);
            console.log(mealplans);
            this.setState({
                mealplanNames: mealplans.map((plan) => 
                <a href="/" class="list-group-item list-group-item-action d-flex justify-content-between border-end-0 border-start-0" onClick={this.linkHandler}>
                    {plan.name}
                    <span>
                        <span class="btn edit-button"></span>
                        <span class="btn delete-button"></span>
                    </span>
                    
                </a>)
            });
        })
        // console.log(this.state.mealplanNames)
    }
        
    render() {
        return (
            <div class="container">
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