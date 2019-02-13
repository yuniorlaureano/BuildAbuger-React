import React, {Component} from 'react';
import Aux from '../../hoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.7,
    bacon: 0.7
};

class BulgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 0,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;       
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0)
        {
            return 0;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddtion;       
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

        //alert("You continue");
        //this.setState({loading: true});
        /*const order = {
            ingredients: this.state.ingredients,
            price: this.state.oldPrice,
            customer:{
                name: "Yunior",
                address:{
                    street: "Gregorio Luperon",
                    zipCode: '41351',
                    country: "Dominicana"
                },
                email: 'yuniorlaureano@gmail.com'
            },
            deliverMethod: 'faster'
        };

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({loading: false, purchasing: false});
        }).catch(response => {
            console.log(response);
            this.setState({loading: false, purchasing: false});
        });*/
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    componentDidMount(){
        axios.get('https://react-my-burger-789d8.firebaseio.com/ingredients.json')
             .then(response => {
                this.setState({ingredients: response.data});
             }).catch(error => {this.setState({error: true});});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        
        if(this.state.ingredients){
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />
        }
        
        let burger = <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <div>
                     <Burger ingredients={this.state.ingredients}></Burger>
                     <BuildControls
                     ingredientAddet={this.addIngredientHandler}
                     ingredientRemoved={this.removeIngredientHandler} 
                     disabled={disabledInfo}
                     purchaseable={this.state.purchaseable}
                     ordered={this.purchaseHandler}
                     price={this.state.totalPrice}/>
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

export default withErrorHandler(BulgerBuilder, axios);