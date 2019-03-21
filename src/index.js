import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import logo from './logo.svg';

// On ajoute le paramètre title à notre component
ReactDOM.render(
    <App title = "HappyDrink"/>,
    document.getElementById('root')
);
