import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  
  componentDidMount(){
     
    this.props.onTryAuthoSignUp();
  }

  render() {

    let routes = (
      <Switch> 
        <Route path="/auth" exac component={Auth}/>
        <Route path="/" component={BurgerBuilder}/>  
        <Redirect to='/'/>
      </Switch>
    );
    if(this.props.isAuthenticate){
      routes = (
        <Switch>            
          <Route path="/checkout" exac component={Checkout}/>
          <Route path="/orders" exac component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={BurgerBuilder}/>            
      </Switch>
      );
    }
    
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
