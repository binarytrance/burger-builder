import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import { transform } from "@babel/core";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(IgKey => {
      return [...Array(props.ingredients[IgKey])].map((_, index) => {
        return <BurgerIngredient type={IgKey} key={IgKey + index} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add burger ingredients.</p>;
  }
  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default Burger;
