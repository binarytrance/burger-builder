import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import instance from "../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
    salad: 0.8,
    meat: 1,
    bacon: 0.7,
    cheese: 0.6
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 0,
        purchasable: false,
        showModal: false,
        loading: false
    };
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
        this.setState({ loading: true });
        const customerOrder = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customerDetails: {
                address: {
                    street: "asdf",
                    state: "KA",
                    pinCode: "214453"
                },
                email: "ganeshan.dash@gmail.com"
            }
        };
        console.log("axios", instance);

        instance
            .post("/orders.json", customerOrder)
            .then(response => {
                this.setState({ loading: false, showModal: false });
                console.log("response", response);
            })
            .catch(error => {
                this.setState({ loading: false, showModal: false });
                console.log("error", error);
            });
    };
    render() {
        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                closeModalHandler={this.closeModalHandler}
                continuePurchaseHandler={this.continuePurchaseHandler}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }
        // console.log("disabled info", disabledInfo);

        return (
            <Aux>
                {this.state.showModal ? (
                    <Modal show={this.state.showModal} closeModalHandler={this.closeModalHandler}>
                        {orderSummary}
                    </Modal>
                ) : null}
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    openModalHandler={this.openModalHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
