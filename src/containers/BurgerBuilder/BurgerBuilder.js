import React, {Component} from 'react';
import Aux from '../../hoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BulgerBuilder extends Component{

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    updatePurchase = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
    }

    componentDidMount(){
        // axios.get('https://react-my-burger-789d8.firebaseio.com/ingredients.json')
        //      .then(response => {
        //         this.setState({ingredients: response.data});
        //      }).catch(error => {this.setState({error: true});});
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        
        if(this.props.ings){
            orderSummary = <OrderSummary ingredients={this.props.ings} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.price}
            />
        }
        
        let burger = <Spinner/>;

        if(this.props.ings){
            
            burger = (
                <div>
                     <Burger ingredients={this.props.ings}></Burger>
                     <BuildControls
                        ingredientAddet={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchase(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </div>
             );
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this  .purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BulgerBuilder, axios));