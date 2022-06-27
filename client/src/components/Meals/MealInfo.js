import React, {Component} from 'react';
import config from "../../config.json";
import axios from 'axios';
import { Accordion } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../Navbar/CustomNavbar.js"


class MealInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            meal: {},
            images: <></>,
            steps: <></>
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        const storageCheck = JSON.parse(localStorage.getItem(id));
        const config2 = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }
        axios.get('/user/isUserAuth', config2)
            .then(res => {
                if(res.data.isAuth === false){
                    window.location = "/login"; 
                }
            })
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + id + '/information',
            headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': config["api-key"]
            }
        };
        if(storageCheck && (Date.now() < storageCheck.ttl)){
            this.setState({meal: storageCheck})
            const imageList = <div class="row">
                    {storageCheck.extendedIngredients.map((ingredient) => <div class="col-6"><img alt="ingredient"
                style={{width: "50px", height: "50x"}} src={"https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image}></img><h6>{ingredient.original}</h6></div>)}
                </div>;
            let instructions = <></>;
            if(storageCheck.analyzedInstructions.length > 0){
                instructions = <ol>
                    {storageCheck.analyzedInstructions[0].steps.map((stepJSON) => <li list-style-type="circle">{stepJSON.step}</li>)}
                    </ol>
            }
            
            this.setState({meal: storageCheck, 
                    images: imageList,
                steps: instructions})         
        }
        else{
            axios.request(options).then(res => {
                res.data.ttl = Date.now() + (86400 * 1000);
                localStorage.setItem(id, JSON.stringify(res.data));
                const imageList = <div class="row">
                    {res.data.extendedIngredients.map((ingredient) => <div class="col-6"><img alt="ingredient"
                style={{width: "50px", height: "50x"}} src={"https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image}></img><h6>{ingredient.original}</h6></div>)}
                </div>
                let instructions = <></>;
                if(res.data.analyzedInstructions.length > 0){
                    instructions = <ol>
                        {res.data.analyzedInstructions[0].steps.map((stepJSON) => <li list-style-type="circle">{stepJSON.step}</li>)}
                        </ol>
                }
                
                this.setState({meal: res.data, 
                        images: imageList,
                    steps: instructions})            
            }).catch(err => {
                console.error(err)
            })
        }
    }

    render(){
        const id = this.props.match.params.id
        let meal = this.state.meal
        return(
            <>
            <CustomNavbar></CustomNavbar>
            <div class="clearfix" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', fontFamily: "Lexend"}}>
                <img alt="meal" style={{width: "390px", height: "260px"}} src={"https://spoonacular.com/recipeImages/" + id + "-556x370.jpg"} align="left" class="col-md-8 float mb-3 mt-2 me-5 ms-md-3"></img>
                <h1 style={{fontFamily: "Lexend"}}>{meal.title}</h1>
                <p style={{fontSize: "20px"}} dangerouslySetInnerHTML={{__html: meal.summary}}></p>
                

            </div>
            <div style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', fontFamily: "Lexend", width: "100%"}}>
                
                    <Accordion defaultActiveKey="0" style={{width: "70vw", marginLeft: "1vw"}} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                    Ingredients
                            </Accordion.Header>
                            <Accordion.Body>
                                {this.state.images}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                    Steps
                            </Accordion.Header>
                            <Accordion.Body>
                                {this.state.steps}
                            </Accordion.Body>
                        </Accordion.Item>
                        
                        
                    </Accordion>
                
            </div>
            
            </>
        )
    }
}

export default MealInfo;