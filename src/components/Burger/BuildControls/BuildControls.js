import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

import Aux from "../../../hoc/Aux";

//here the instructor has added another object of ingredients as label and type pairs
// const controls = [
//     { label: "Salad", type: "salad" },
//     { label: "Bacon", type: "bacon" },
//     { label: "Cheese", type: "cheese" },
//     { label: "Meat", type: "meat" }
// ];

const BuildControls = props => {
    // const [showModal, setShowModal] = useState(false);
    const BuildControlsLayout = Object.keys(props.ingredients).map((IName, i) => {
        // console.log(props);
        return (
            <BuildControl
                key={IName + i}
                label={IName}
                addIngredient={props.addIngredient}
                removeIngredient={props.removeIngredient}
                disabled={props.disabledInfo}
            />
        );
    });
    // console.log(props, BuildControlsLayout, props.purchasable);

    return (
        <Aux>
            <div className={classes.BuildControls}>
                <p>Total Price: ${props.price.toFixed(2)}</p>
                {BuildControlsLayout}
                <button
                    className={classes.OrderButton}
                    disabled={!props.purchasable && props.isLoggedIn}
                    onClick={props.openModalHandler}
                >
                    {!props.isLoggedIn ? `Sign In to Order` : `Order Now`}
                </button>
            </div>
        </Aux>
    );
};

export default BuildControls;
