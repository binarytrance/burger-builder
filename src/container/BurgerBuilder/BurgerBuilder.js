import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

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
        showModal: false
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
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }
        // console.log("disabled info", disabledInfo);

        return (
            <Aux>
                {this.state.showModal && (
                    <Modal show={this.state.showModal} closeModalHandler={this.closeModalHandler}>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            closeModalHandler={this.closeModalHandler}
                        />
                    </Modal>
                )}
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
