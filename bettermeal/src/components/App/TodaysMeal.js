import React, { Component } from "react";
import axios from "axios";
import MealSnippet from "./MealSnippet"
import "bootstrap/dist/css/bootstrap.min.css";



class TodaysMeal extends Component{
    constructor(props){
        super(props);
        this.state = {
            buttonStates: ["rounded", "rounded", "rounded"],
            activePlan: {},
            todaysMeals: [],
            mealSnippets: [],
            activeSnippet: 0
        }
    }

    mealtimeClick = (id) => {
        let newArray = this.state.buttonStates;
        newArray[id] = "rounded-focus"
        for(let i = 0; i < 3; i++){
            if(i !== id){
                newArray[i] = "rounded"
            }
        } 
        this.setState({buttonStates: newArray})
        if(this.state.activePlan){
            this.setState({activeSnippet: id})
            this.forceUpdate()
        }
    }

    weekdayStringConvert = (dayInt) => {
        switch (dayInt) {
            case 0:
              return "sunday";
            case 1:
              return "monday";
            case 2:
               return "tuesday";
            case 3:
              return "wednesday";
            case 4:
              return "thursday";
            case 5:
              return "friday";
            case 6:
              return "saturday";
        }
    }

    getMealPeriod = (timeInt) => {
        if(0 <= timeInt && timeInt < 11){
            return 0;
        }
        else if(11 <= timeInt && timeInt < 17){
            return 1;
        }
        else{
            return 2;
        }
    }

    componentDidMount(){
        const config = {
            headers:{
            "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/user/getActive', config)
        .then(activePlanRes => {
            if(activePlanRes.data.isAuth === false){
                window.location = "/login"; 
            }
            if(activePlanRes.data.activePlanId){
                axios.get('http://localhost:5000/mealplan/' + activePlanRes.data.activePlanId, config)
                .then(res => {
                    this.setState({activePlan: res.data})
                    let current = new Date();
                    let weekdayStr = this.weekdayStringConvert(current.getDay());
                    this.setState({todaysMeals: res.data[weekdayStr]});
                    let mealPeriod = this.getMealPeriod(current.getHours());
                    this.setState({mealSnippets: [<MealSnippet id={res.data[weekdayStr][0]}></MealSnippet>, <MealSnippet id={res.data[weekdayStr][1]}></MealSnippet>, 
                    <MealSnippet id={res.data[weekdayStr][2]}></MealSnippet>],
                    activeSnippet: mealPeriod})
                    let buttonStatesCp = this.state.buttonStates
                    buttonStatesCp[mealPeriod] = "rounded-focus"
                    this.setState({buttonStates: buttonStatesCp})         
                })
            }
            else{
                this.setState({activePlan: null})
                this.setState({mealSnippets: [<h1 style={{padding: "20px"}}>Head to Meal Plans and click a Mealplans Checkbox to select an Active Meal Plan!</h1>]})
            }
            
        })
        


    }


    render(){
        let snippet = this.state.mealSnippets[this.state.activeSnippet]
        return (
        <>
            <div class="row m-0" >
                <div class="col-2" style={{width: "300px", marginTop: "10vh", marginLeft: "5vw"}}>
                    <button class={this.state.buttonStates[0]} onClick={() => this.mealtimeClick(0)} style={{position: "relative", top: '0vh'}}><span class="rounded-text">Breakfast</span></button>
                    <button class={this.state.buttonStates[1]} onClick={() => this.mealtimeClick(1)} style={{position: "relative", top: '0.5vh'}}><span class="rounded-text">Lunch</span></button>
                    <button class={this.state.buttonStates[2]} onClick={() => this.mealtimeClick(2)} style={{position: "relative", top: '1vh'}}><span class="rounded-text">Dinner</span></button>
                </div>
                
                    
                
                
                <div class="col-10" style={{display: "block", margin: "auto", backgroundColor: "#13161d", color: "white", fontFamily: "Lexend", width: "50vw", marginLeft: "6vw", marginTop: "10vh", borderRadius: "1rem", minWidth: "300px", minHeight: "200px"}}>
                    {snippet}
                </div>
            </div>
            
            

            
        </>
        )
    }
}

export default TodaysMeal;