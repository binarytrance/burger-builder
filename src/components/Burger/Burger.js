import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import Aux from "../../hoc/Aux";

const Burger = props => {
    console.clear();
    console.log(props.ingredients);

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
    // console.log(transformedIngredients);
    return (
        <Aux>
            <div className={classes.Burger}>
                <BurgerIngredient type={"bread-top"} />
                {transformedIngredients}
                <BurgerIngredient type={"bread-bottom"} />
            </div>
        </Aux>
    );
};

export default Burger;
