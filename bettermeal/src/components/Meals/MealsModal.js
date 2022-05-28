import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Meal from './Meal';
import { Modal } from 'react-bootstrap';


class MealsModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchField: "",
            mealsResult: <></>
        }
    }
    

    handleClick(event){
        event.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
            params: {query: this.state.searchField, number: '10', offset: '0'},
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': '51be17977amsh1e7b4aa1af671dep16977ajsn18b85345a72c'
            }
        };
        const storageCheck = JSON.parse(localStorage.getItem(this.state.searchField));
        // console.log(Date.now())
        // console.log(storageCheck.ttl)
        if(storageCheck && (Date.now() < storageCheck.ttl)){
            const mealArray = Array.from(storageCheck.results);
            this.setState({
                mealsResult: <div class="row row-cols-3">
                    {mealArray.map((meal) =>
                    <div class="col" style={{marginBottom: "2rem", height: "250px"}}><Meal id={meal.id}></Meal></div>)}
                </div>
            })
        }
        else{
            axios.request(options).then(response => {
                alert("broken, also spending...")
                response.data.ttl = Date.now() + (86400 * 1000);
                localStorage.setItem(this.state.searchField, JSON.stringify(response.data));
                const mealArray = Array.from(response.data.results);
                this.setState({
                    mealsResult: <div class="row row-cols-3">
                        {mealArray.map((meal) =>
                        <div class="col" style={{marginBottom: "2rem", height: "250px"}}><Meal id={meal.id}></Meal></div>)}
                    </div>
                })
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    render(){
        return(
           <Modal show={this.props.show} size="lg" scrollable={true}>
                <Modal.Header>Meal Search</Modal.Header>
                <Modal.Body>
                    <form id="mealsearch-form" style={{left: '0vw', width: '100%'}}>
                        
                        <div class="form-outline mb-4 input-group inner-addon right-addon">
                            
                            <input type="text"  id="mealsearch" style={{left: '0vw', width: '100%'}} placeholder='Search for any meal!' value={this.state.searchField} onChange={event => {this.setState({searchField: event.target.value})}}/>
                            
                            
                            {/* <span class="input-group-btn">
                                <button class="btn btn-primary" type="button"></button>
                            </span> */}
                            
                        </div>
                        <span class="input-group-btn">
                            <button class="search-icon" type="submit" onClick={event => this.handleClick(event)}></button>
                        </span>
                    </form>
                    {this.state.mealsResult}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => {this.setState({mealsResult: <></>, searchField: ""}); this.props.closeFunc()}}>Close</button>
                </Modal.Footer>
            </Modal>
            
        )
    }
}


export default MealsModal