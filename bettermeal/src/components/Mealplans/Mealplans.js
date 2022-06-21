import React, { Component } from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mealplans.css"
import { Link } from 'react-router-dom';
import "../MealPlan/MealplanModal"
import EditModal from '../MealPlan/MealplanModal';

class Mealplans extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            mealplanNames: [],
            authorized: false,
            showEdit: false,
            showNew: false,
            type: "edit",
            editId: "",
            activePlan: "",
            plans: []
        }
        this.onClickHandler = this.onClickHandle.bind(this)
    }
    onClickHandle = (event) =>{
        event.stopPropagation();
        return <Mealplans></Mealplans>

    }

    linkHandler = (event) =>{
        if(event.target.tagName.toLowerCase() !== 'a'){
            event.preventDefault();
        }
    }

    editRedirect = (id) => {
        // window.location = "/meals";
        const newVal = this.state.showEdit ? false : true
        this.setState({showEdit: newVal, editId: id})
    }

    newRedirect = () => {
        this.setState({showNew: true})
    }

    setActivePlan = (id) => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.post('http://localhost:5000/user/setActive', {planId: id}, config).then(() => {this.refreshPlans()})
    }

    changePlansFunc = (id) => (nameParam) => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.post('http://localhost:5000/mealplan/namechange/' + id, {name: nameParam}, config).then(() => {this.refreshPlans();})
    }

    newPlansFunc = () => (nameParam) => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        const newPlan = {
            name: nameParam,
            sunday: ["", "", "", "", "", ""],
            monday: ["", "", "", "", "", ""],
            tuesday: ["", "", "", "", "", ""],
            wednesday: ["", "", "", "", "", ""],
            thursday: ["", "", "", "", "", ""],
            friday: ["", "", "", "", "", ""],
            saturday: ["", "", "", "", "", ""],
            date_created: ""
        }
        axios.post('http://localhost:5000/mealplan/new', newPlan, config).then(() => {this.refreshPlans();})
    }

    deletePlanFunc = (id) => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.post('http://localhost:5000/mealplan/delete', {planId: id}, config).then(() => {this.refreshPlans();})
    }
    refreshPlans = () => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('http://localhost:5000/user/getActive', config)
        .then(activePlanRes => {
            if(activePlanRes.data.isAuth === false){
                window.location = "/login"; 
            }
            axios.get('http://localhost:5000/mealplan', config)
            .then(res => {
                const mealplans = Array.from(res.data);
                this.setState({
                    mealplanNames: mealplans.map((plan) => 
                        
                        <Link to={"/mealplan/" + plan._id} class="list-group-item list-group-item-action d-flex justify-content-between border-end-0 border-start-0"
                        style={{backgroundColor: "#13161d", color: "whitesmoke"}} onClick={this.linkHandler}>
                            {plan.name}
                            <span>
                                <span class="btn edit-button" onClick={() => this.editRedirect(plan._id)}></span>
                                {/* <span class="btn edit-button" onClick={this.editRedirect}></span> */}
                                <span href="" class="btn delete-button" onClick={() => {this.deletePlanFunc(plan._id)}}></span>
                                <input style={{position: "relative", top: "2px", marginLeft: "2px"}} type="checkbox" title="Set Active" checked={activePlanRes.data.activePlanId === plan._id ? true : false} onChange={() => this.setActivePlan(plan._id)}></input>
                            </span>
                            
                        </Link>
                        
                        )
                });
            })
        })
        
    }
   
    componentDidMount(){
        this.refreshPlans()
    }
        
    render() {
        return (
            <div class="container" id="MealplansContainer" style={{borderRadius: "1rem", padding: "1vmax"}}>
            <h2 style={{color: "whitesmoke"}}>Meal Plans</h2>
                {/* <hr /> */}
                <div class="list-group list-group-flush">
                    {this.state.mealplanNames}
                </div>
                <button class="add-more-button" type="button" onClick={() => this.newRedirect()}></button>
                <EditModal id={this.state.editId} show={this.state.showEdit} changePlansFunc={this.changePlansFunc(this.state.editId)}
                closeFunc={() => {this.setState({showEdit: false})}}></EditModal>

                <EditModal show={this.state.showNew} type="new" changePlansFunc={this.newPlansFunc()}
                closeFunc={() => {this.setState({showNew: false})}}></EditModal>
            </div>
           
            
            
        )
    }
}

export default Mealplans