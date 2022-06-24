import React, { Component } from "react";
import axios from "axios";
import Meal from "../Meals/Meal";

class WeeklyPlan extends Component{
    constructor(props){
        super(props)
        this.state = {
            currMealplan: {},
            sunday: ["", "", "", "No Meal", "No Meal", "No Meal"],
            monday:  ["", "", "", "No Meal", "No Meal", "No Meal"],
            tuesday:  ["", "", "", "No Meal", "No Meal", "No Meal"],
            wednesday:  ["", "", "", "No Meal", "No Meal", "No Meal"],
            thursday:  ["", "", "", "No Meal", "No Meal", "No Meal"],
            friday:  ["", "", "", "No Meal", "No Meal", "No Meal"],
            saturday:  ["", "", "", "No Meal", "No Meal", "No Meal"]
        }
    }

    componentDidMount(){
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('/user/isUserAuth', config)
            .then(res => {
                if(res.data.isAuth === false){
                    window.location = "/login"; 
                }
            })

        this.forceUpdate()
        if(this.props.id){
            axios.get('/mealplan/' + this.props.id, config)
                .then(res => {
                    this.setState({
                        currMealplan: res.data,
                        sunday: res.data.sunday,
                        monday: res.data.monday,
                        tuesday: res.data.tuesday,
                        wednesday: res.data.wednesday,
                        thursday: res.data.thursday,
                        friday: res.data.friday,
                        saturday: res.data.saturday
                    })
                })
        }
    }

    changeMealFunc = (day, mealtime) => (newMeal, newTitle) => {
        let planCopy = this.state.currMealplan
        planCopy[day][mealtime] = newMeal
        planCopy[day][mealtime + 3] = newTitle
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.post('/mealplan/edit/' + this.props.id + '/' + day + '/' + mealtime, {mealId: newMeal, mealTitle: newTitle}, config)
        .then((res) => {this.forceUpdate();})
        
    }

    render(){
        let content = <div style={{backgroundColor: "#13161d", position: "relative", top: "10vh", display: "block", margin: "auto", width: "60vw"}}>
            <h1 style={{textAlign: "center", color: "white", padding: "2vmax", fontFamily: "Lexend"}}>Set an Active Meal Plan First!</h1></div>
        if(this.props.id){
            content = <><div style={{position: "relative", display: "block", margin: "auto", top: "10vh", width: "60vw", backgroundColor: "#13161d", color: "white"}}>
        <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Sunday:</h2>
                    </div>
                    <div class="col" >
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.sunday[0]} title={this.state.sunday[3]} edit={true} changeMealFunc={this.changeMealFunc("sunday", 0)}></Meal>
                        
                            <Meal id={this.state.sunday[1]} title={this.state.sunday[4]} edit={true} changeMealFunc={this.changeMealFunc("sunday", 1)}></Meal>
                        
                            <Meal id={this.state.sunday[2]} title={this.state.sunday[5]} edit={true} changeMealFunc={this.changeMealFunc("sunday", 2)}></Meal>
                        </div>
                        
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Monday:</h2>
                    </div>
                    <div class="col">
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.monday[0]} title={this.state.monday[3]} edit={true} changeMealFunc={this.changeMealFunc("monday", 0)}></Meal>
                    
                            <Meal id={this.state.monday[1]} title={this.state.monday[4]} edit={true} changeMealFunc={this.changeMealFunc("monday", 1)}></Meal>
                    
                            <Meal id={this.state.monday[2]} title={this.state.monday[5]} edit={true} changeMealFunc={this.changeMealFunc("monday", 2)}></Meal>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Tuesday:</h2>
                    </div>
                    <div class="col">
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.tuesday[0]} title={this.state.tuesday[3]} edit={true} changeMealFunc={this.changeMealFunc("tuesday", 0)}></Meal>
                    
                            <Meal id={this.state.tuesday[1]} title={this.state.tuesday[4]} edit={true} changeMealFunc={this.changeMealFunc("tuesday", 1)}></Meal>
                    
                            <Meal id={this.state.tuesday[2]} title={this.state.tuesday[5]} edit={true} changeMealFunc={this.changeMealFunc("tuesday", 2)}></Meal>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Wednesday:</h2>
                    </div>
                    <div class="col">
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.wednesday[0]} title={this.state.wednesday[3]} edit={true} changeMealFunc={this.changeMealFunc("wednesday", 0)}></Meal>
                    
                            <Meal id={this.state.wednesday[1]} title={this.state.wednesday[4]} edit={true} changeMealFunc={this.changeMealFunc("wednesday", 1)}></Meal>
                    
                            <Meal id={this.state.wednesday[2]} title={this.state.wednesday[5]} edit={true} changeMealFunc={this.changeMealFunc("wednesday", 2)}></Meal>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Thursday:</h2>
                    </div>
                    <div class="col">
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.thursday[0]} title={this.state.thursday[3]} edit={true} changeMealFunc={this.changeMealFunc("thursday", 0)}></Meal>
                    
                            <Meal id={this.state.thursday[1]} title={this.state.thursday[4]} edit={true} changeMealFunc={this.changeMealFunc("thursday", 1)}></Meal>
                    
                            <Meal id={this.state.thursday[2]} title={this.state.thursday[5]} edit={true} changeMealFunc={this.changeMealFunc("thursday", 2)}></Meal>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Friday:</h2>
                    </div>
                    <div class="col">
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.friday[0]} title={this.state.friday[3]} edit={true} changeMealFunc={this.changeMealFunc("friday", 0)}></Meal>
                    
                            <Meal id={this.state.friday[1]} title={this.state.friday[4]} edit={true} changeMealFunc={this.changeMealFunc("friday", 1)}></Meal>
                    
                            <Meal id={this.state.friday[2]} title={this.state.friday[5]} edit={true} changeMealFunc={this.changeMealFunc("friday", 2)}></Meal>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2">
                    <div class="col" style={{width: "16vw"}}>
                        <h2 style={{position: "relative", top: "3vh"}}>Saturday:</h2>
                    </div>
                    <div class="col">
                        <div class="card-group" style={{position: "relative"}}>
                            <Meal id={this.state.saturday[0]} title={this.state.saturday[3]} edit={true} changeMealFunc={this.changeMealFunc("saturday", 0)}></Meal>
                    
                            <Meal id={this.state.saturday[1]} title={this.state.saturday[4]} edit={true} changeMealFunc={this.changeMealFunc("saturday", 1)}></Meal>
                    
                            <Meal id={this.state.saturday[2]} title={this.state.saturday[5]} edit={true} changeMealFunc={this.changeMealFunc("saturday", 2)}></Meal>
                        </div>
                    </div>
                </div>
                
            </div></>
        }
        
        return(
            <>
            {content}
                
            </>
        )
    }
}

export default WeeklyPlan;