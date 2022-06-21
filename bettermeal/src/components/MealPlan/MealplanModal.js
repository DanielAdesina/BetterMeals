import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import config from "../../config.json";



class EditModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameField: "",
        }
    }
    submitEvent = (event) => {
        event.preventDefault();
        this.props.changePlansFunc(this.state.nameField)
    }

    render(){
        let title = "Rename Mealplan"
        if(this.props.type === "new"){
            title = "New Mealplan!"
        }
        return(
            <Modal show={this.props.show} size="lg">
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <form id="rename-form" style={{left: '0vw', width: '100%'}}>
                        
                        <div class="form-outline mb-4 input-group inner-addon right-addon">
                            
                            <input type="text" id="rename" style={{left: '0vw', width: '100%'}} placeholder='Enter a Name!' 
                            value={this.state.nameField} onChange={event => {this.setState({nameField: event.target.value})}}/>
                            
                        </div>
                        <button type="submit" style={{position: "absolute", width: "50%", top: "6vh"}} onClick={(event) => {this.submitEvent(event); this.props.closeFunc()}}>Save</button>
                        <button style={{position: "absolute", width: "50%", top: "6vh", left: "50%"}} onClick={() => {this.props.closeFunc()}}>Close</button>

                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default EditModal;