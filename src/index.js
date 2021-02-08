import React from "react";
import ReactDOM from "react-dom";
import "tailwindcss/dist/tailwind.css";
// import "./assets/main.css";
import App from "./App";
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import auth from './store/reducers/auth';
import * as serviceWorker from "./serviceWorker";
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({burgerBuilder: burgerBuilderReducer, order: order, auth});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
