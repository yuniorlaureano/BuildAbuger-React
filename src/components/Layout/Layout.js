import React, {Component} from 'react';
import Aux from '../../hoc/AuxHoc';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: true
    };

    sideDrawerClosedHandler() {
        this.setState({showSideDrawer: false});
    };

    drawerToggleClick() {
        console.log("asdfsadf");
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };

    render(){
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClick={this.drawerToggleClick.bind(this)}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler.bind(this)} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}
export default connect(mapStateToProps)(Layout);