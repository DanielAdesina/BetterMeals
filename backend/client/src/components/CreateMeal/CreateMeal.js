import React, { Component } from 'react';
import axios from 'axios';

class CreateMeal extends Component {
    constructor(props){
        super(props);
        this.state = {
            meal_name: '',
            recipe: '',
        }
        this.onChangeMealName = this.onChangeMealName.bind(this);
        this.onChangeMealRecipe = this.onChangeMealRecipe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeMealName(e){
        this.setState({
            meal_name: e.target.value
        });
    }

    onChangeMealRecipe(e){
        this.setState({
            recipe: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        
        let newMeal = {
            name: this.state.meal_name,
            recipe: this.state.recipe
        };

        axios.post('http://localhost:5000/meals/add', newMeal)
            .then(res => {});
        
        this.setState({
           meal_name: '',
           recipe: ''
        })
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>New Meal!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.meal_name}
                                onChange={this.onChangeMealName}
                                />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label>Recipe: </label>
                        <textarea 
                                type="text" 
                                className="form-control"
                                rows="5"
                                value={this.state.recipe}
                                onChange={this.onChangeMealRecipe}
                                />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create Meal" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateMeal;