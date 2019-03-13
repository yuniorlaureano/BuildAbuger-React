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
import * as burgerBuilderActions from '../../store/actions/index';
import { stat } from 'fs';

class BulgerBuilder extends Component{

    state = {
        purchasing: false
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
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }

    componentDidMount(){
        this.props.onInitIngredients();
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
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}/>
                </div>
             );
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchased: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BulgerBuilder, axios));