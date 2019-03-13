import React, { Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

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
            }           
        },
        isSignup: true
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        });
    }

    componentDidMount(){
        if(this.props.buildingBurger && this.props.onSetAuthRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => {
             return <Input 
                key={formElement.id} inputtype = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.value}
                changed={(event)=> {this.inputChangedHandler(event, formElement.id)}}                
                />
        });
        
        if(this.props.loading)
        {
            form = <Spinner/>
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated)
        {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div  className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHnadler}>
                {form}
                <Button btnType="Success">Auth</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Success">SWITCH TO {this.state.isSignup? "SIGNIN" : "SIGNUP"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispathToProps = dispathc => {
    return {
        onAuth: (email, password, isSignup) => dispathc(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispathc(actions.setAuthRedirectPath('/'))
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Auth);