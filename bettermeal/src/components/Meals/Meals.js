import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meals.css"


class Meals extends Component {
    render() {
        return (
            <div class="container" id="meals-container">
                <form id="mealsearch-form">
                
                    <div class="form-outline mb-4 input-group inner-addon right-addon">
                        
                        <input type="text"  id="mealsearch" placeholder='Search for any meal!' />
                        
                        
                        {/* <span class="input-group-btn">
                            <button class="btn btn-primary" type="button"></button>
                        </span> */}
                        
                    </div>
                    <span class="input-group-btn">
                        <button class="search-icon"></button>
                    </span>
                </form>
                
                                    
            </div>

                            
        )
    }
}

export default Meals;