import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>            
            <Route path="/checkout" exac component={Checkout}/>
            <Route path="/orders" exac component={Orders}/>
            <Route path="/auth" exac component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" component={BurgerBuilder}/>            
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
