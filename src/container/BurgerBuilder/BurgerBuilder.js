import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 2,
      bacon: 0,
      cheese: 0
    }
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredients={this.state.ingredients} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
