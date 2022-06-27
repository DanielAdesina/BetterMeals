import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Meal from './Meal';
import { Modal } from 'react-bootstrap';
import config from "../../config.json";



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
            params: {query: this.state.searchField, number: '12', offset: '0'},
            headers: {
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'X-RapidAPI-Key': config['api-key']
            }
        };
        const storageCheck = JSON.parse(localStorage.getItem(this.state.searchField));
        if(storageCheck && (Date.now() < storageCheck.ttl)){
            const mealArray = Array.from(storageCheck.results);
            this.setState({
                mealsResult: <div class="row row-cols-3">
                    {mealArray.map((meal) =>
                    <div class="col" style={{marginBottom: "2rem", height: "250px"}} onClick={() => {this.props.changeMealFunc(meal.id, meal.title); this.props.closeFunc()}}>
                        <Meal id={meal.id} title={meal.title}></Meal>
                    </div>)}
                </div>
            })
        }
        else{
            axios.request(options).then(response => {
                response.data.ttl = Date.now() + (86400 * 1000);
                localStorage.setItem(this.state.searchField, JSON.stringify(response.data));
                const mealArray = Array.from(response.data.results);
                this.setState({
                    mealsResult: <div class="row row-cols-3">
                        {mealArray.map((meal) =>
                         <div class="col" style={{marginBottom: "2rem", height: "250px"}} onClick={() => {this.props.changeMealFunc(meal.id, meal.title); this.props.closeFunc()}}>
                             <Meal id={meal.id} title={meal.title}></Meal>
                         </div>)}
                    </div>
                })
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    render(){
        return(
           <Modal className="myModal" show={this.props.show} size="lg" scrollable={true}>
                <Modal.Header>Meal Search</Modal.Header>
                <Modal.Body>
                    <form style={{left: '0vw', width: '100%'}}>
                        
                        <div class="form-outline mb-4 input-group inner-addon right-addon">
                            
                            <input type="text"  id="mealsearch" style={{left: '0vw', width: "95%"}} placeholder='Search for any meal!' 
                            value={this.state.searchField} onChange={event => {this.setState({searchField: event.target.value})}}/>
                            <span class="input-group-btn">
                                <button class="search-icon" type="submit" onClick={event => this.handleClick(event)}></button>
                            </span>
                            
                            {/* <span class="input-group-btn">
                                <button class="btn btn-primary" type="button"></button>
                            </span> */}
                            
                        </div>
                       
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