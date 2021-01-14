import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.8,
    meat: 1,
    bacon: 0.7,
    cheese: 0.6
};
class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        totalPrice: 0,
        purchasable: false,
        showModal: false,
        loading: false,
        errorState: false
    };
    // componentDidMount() {
    //     axiosInstance
    //         .get("https://my-burger-builder-42007.firebaseio.com/ingredients.json")
    //         .then(res => {
    //             this.setState({ ingredients: res.data });
    //         })
    //         .catch(err => {
    //             this.setState({ errorState: true });
    //         });
    // }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    };
    addIngredientHandler = ingredient => {
        const updatedIngredients = { ...this.state.ingredients };
        const updatedIngredientCount = this.state.ingredients[ingredient] + 1;
        updatedIngredients[ingredient] = updatedIngredientCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[ingredient];
        this.setState({
            ...this.state.ingredients,
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };
    removeIngredientHandler = ingredient => {
        // console.log("this.state.ingredients[ingredient]", this.state.ingredients[ingredient]);

        if (this.state.ingredients[ingredient] > 0) {
            const updatedIngredients = { ...this.state.ingredients };
            const updatedIngredientCount = this.state.ingredients[ingredient] - 1;
            updatedIngredients[ingredient] = updatedIngredientCount;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[ingredient];
            this.setState({
                ...this.state.ingredients,
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };
    openModalHandler = () => {
        this.setState({ showModal: true });
    };
    closeModalHandler = () => {
        this.setState({ showModal: false });
    };
    continuePurchaseHandler = () => {
        const ingredients = this.state.ingredients;
        // console.log(ingredients);
        const queryParams = [];
        for (let i in ingredients) {
            // encodeURIComponent - is used to encode data such that they can be used int he url
            queryParams.push(
                encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])
            );
        }
        console.log("bubuilder", this.state.totalPrice);

        queryParams.push("totalPrice=" + this.state.totalPrice);
        const queryString = queryParams.join("&");
        // console.log(queryString);
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    };
    render() {
        let orderSummary = null;

        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }
        // console.log("disabled info", this.state.showModal);
        let burger = this.state.errorState ? <p>Ingredients cannot be shown</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredients={this.props.ingredients}
                        addIngredient={this.props.addIngredientHandler}
                        removeIngredient={this.props.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        openModalHandler={this.openModalHandler}
                    />
                </>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.state.totalPrice}
                    closeModalHandler={this.closeModalHandler}
                    continuePurchaseHandler={this.continuePurchaseHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.showModal} closeModalHandler={this.closeModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps =  state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        removeIngredientHandler: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
