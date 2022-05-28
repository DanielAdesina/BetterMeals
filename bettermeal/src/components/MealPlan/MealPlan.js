import React, { Component } from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mealplan.css"
import emptysign from "./emptyplate.webp"
import axios from 'axios';
import Meal from "../Meals/Meal"

class MealPlan extends Component {
    constructor(props){
        super(props)
        this.state = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: []
        }
    }

    componentDidMount(){
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/mealplan/' + this.props.match.params.id, config)
            .then(res => {
                // console.log(res.data);
                // console.log(res.data.sunday);
                this.setState({
                    sunday: res.data.sunday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    ),
                    monday: res.data.monday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    ),
                    tuesday: res.data.tuesday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    ),
                    wednesday: res.data.wednesday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    ),
                    thursday: res.data.thursday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    ),
                    friday: res.data.friday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    ),
                    saturday: res.data.saturday.map((dbId) => 
                        <Meal id={dbId} edit={true}></Meal>
                    )
                })
            })
    }
    
    render() {
        return (
            <>
            <Navbar></Navbar>
            <div>
                <h1>{this.props.match.params.id}</h1>
            </div>
            <div class="container-xxl mx-auto mt-4" id="MealplanContainer">
                <div class="row row-cols-7">
                    <div class="col">
                        Sunday
                    </div>
                    <div class="col">
                        Monday
                    </div>
                    <div class="col">
                        Tuesday
                    </div>
                    <div class="col">
                        Wednesday
                    </div>
                    <div class="col">
                        Thursday
                    </div>
                    <div class="col">
                        Friday
                    </div>
                    <div class="col last">
                        Saturday
                    </div>
                </div>
                
                <div class="row row-md-auto">
                    <div class="col" style={{height: "250px"}}>
                        {this.state.sunday[0]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.monday[0]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.tuesday[0]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.wednesday[0]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.thursday[0]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.friday[0]}
                    </div>
                    <div class="col last" style={{height: "250px"}}>
                        {this.state.saturday[0]}
                    </div>
                </div>
                <div class="row row-md-auto">
                    <div class="col" style={{height: "250px"}}>
                        {this.state.sunday[1]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.monday[1]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.tuesday[1]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.wednesday[1]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.thursday[1]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.friday[1]}
                    </div>
                    <div class="col last" style={{height: "250px"}}>
                        {this.state.saturday[1]}
                    </div>
                </div>
                <div class="row row-md-auto">
                    <div class="col" style={{height: "250px"}}>
                        {this.state.sunday[2]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.monday[2]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.tuesday[2]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.wednesday[2]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.thursday[2]}
                    </div>
                    <div class="col" style={{height: "250px"}}>
                        {this.state.friday[2]}
                    </div>
                    <div class="col last" style={{height: "250px"}}>
                        {this.state.saturday[2]}
                    </div>
                </div>
            </div>
            </>
            
        )
    }
}

export default MealPlan