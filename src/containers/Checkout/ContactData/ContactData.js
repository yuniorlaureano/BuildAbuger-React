import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends React.Component{
    state = {
        name: '',
        email:'',
        address:{
            street:'',
            postalCode: ''
        },
        loading: false
    }

    orderHander=(event) => {
        event.preventDefault();
        
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            this.setState({loading: false});
            this.props.history.push('/');
        }).catch(response => {
            console.log(response);
            this.setState({loading: false});
        });
    }

    render(){
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Your postal"/>
            <Button btnType="Success" clicked={this.orderHander}>ORDER</Button>
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



export default ContactData;
