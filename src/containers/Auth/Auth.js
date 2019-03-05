import React, { Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation:{
                    required: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true
                }
            },
        }
    };

    inputChangedHandler(event, controlName){
        const updatedConstrols = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value
            }
        }
        this.setState({controls: updatedConstrols});
    }

    submitHnadler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email, this.state.controls.password);
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => {
             return <Input 
                key={formElement.id} inputtype = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.value}
                changed={(event)=> {this.inputChangedHandler(event, formElement.id)}}                
                />
        });
        
        return (
            <div>
                <form className={classes.Auth} onSubmit={this.submitHnadler}>
                {form}
                <Button btnType="Success">Auth</Button>
                </form>
            </div>
        );
    }
}

const mapDispathToProps = dispathc => {
    return {
        onAuth: (email, password) => dispathc(actions.auth(email, password))
    };
}

export default connect(null, mapDispathToProps)(Auth);