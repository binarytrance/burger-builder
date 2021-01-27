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
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        showModal: false,
    };

    componentDidMount () {
        // here we are fetching ingredients inside the component and dispatching an action
        // axiosInstance.get('https://my-burger-builder-42007.firebaseio.com/ingredients.json')
        // .then(response => {
        //     console.log(response.data);
        //     this.props.fetchIngredients(response.data);
        // })
        // .catch(error => {
        //     console.log(error);
        // })
        this.props.fetchIngredients();
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    openModalHandler = () => {
        this.setState({ showModal: true });
    };
    closeModalHandler = () => {
        this.setState({ showModal: false });
    };
    continuePurchaseHandler = () => {
        console.log('queryString');
        this.props.orderPlaced();
        this.props.history.push('/checkout');
    };
    render() {
        // console.log(this.props.ingredients)
        let orderSummary = null;

        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }
        // console.log("disabled info", this.state.showModal);
        let burger = this.props.error ? <p>Ingredients cannot be shown</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredients={this.props.ingredients}
                        addIngredient={this.props.addIngredientHandler}
                        removeIngredient={this.props.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        openModalHandler={this.openModalHandler}
                    />
                </>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.totalPrice}
                    closeModalHandler={this.closeModalHandler}
                    continuePurchaseHandler={this.continuePurchaseHandler}
                />
            );
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        orderPlaced: state.order.orderPlaced
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIngredients: () => dispatch(actions.fetchIngredients()),
        addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        orderPlaced: () => dispatch(actions.orderPlaced())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
