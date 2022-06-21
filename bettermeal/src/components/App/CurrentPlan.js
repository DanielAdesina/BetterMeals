import React, { Component } from "react";
import TodaysMeal from "./TodaysMeal";
import WeeklyPlan from "./WeeklyPlan";
import axios from "axios";



class CurrentPlan extends Component{
    constructor(props){
        super(props)
        this.state = {
            content: [<TodaysMeal></TodaysMeal>],
            currContent: 0
        }
    }

    switchContent = (buttonId) => {
        this.setState({currContent: buttonId})
    }

    componentDidMount(){
        this.setState({currContent: 0})
        const config = {
            headers:{
            "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/user/getActive', config)
        .then(activePlanRes => {
            console.log(activePlanRes.data)
            if(activePlanRes.data.isAuth === false){
                window.location = "/login"; 
            }
            
            this.setState({content: [<TodaysMeal></TodaysMeal>, <WeeklyPlan id={activePlanRes.data.activePlanId}></WeeklyPlan>]})
            
        })
    }

    render(){
        const snippet = this.state.mealSnippet
        console.log(this.state.mealSnippet)
        return (
        <>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-secondary btn-lg" onClick={() => this.switchContent(0)}>Today's Meals</button>
                <button type="button" class="btn btn-secondary btn-lg" onClick={() => this.switchContent(1)}>Weekly Plan</button>
            </div>
            {this.state.content[this.state.currContent]}
        </>
        )
    }
}

export default CurrentPlan