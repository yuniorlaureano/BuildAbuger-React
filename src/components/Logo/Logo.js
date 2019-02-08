import React from 'react';
import logopng  from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logopng} alt="MyBurger"/>
    </div>
);

export default logo;