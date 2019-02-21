import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends React.Component{
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation:{
                    required: true
                }
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'E-Main'
                },
                value: '',
                validation:{
                    required: true
                }
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fasted', displayValue: 'Fasted'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                ]    
                },
                value: ''
            }
        },
        loading: false
    }

    orderHander=(event) => {
        event.preventDefault(); 
        
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order).then(response => {
            
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(response => {
           
            this.setState({loading: false});
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render(){
        
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form onSubmit={this.orderHander}>
            
            {formElementsArray.map(formElement =>(
                <Input key={formElement.id} inputtype = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.value}
                    changed={(event)=> {this.inputChangedHandler(event, formElement.id)}}    />
            ))}
            <Button btnType="Success" >ORDER</Button>
        </form>);

        if(this.state.loading){
            form=<Spinner/>
        }

        return(
        <div className={classes.ContactData}>
            <h4>Enter your Contac Data</h4>
            {form}
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);
