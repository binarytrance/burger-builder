import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = props => {
    // console.log("props", props);

    return (
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button
                className={classes.Less}
                disabled={props.disabled[props.label]}
                onClick={() => props.removeIngredient(props.label)}
            >
                Less
            </button>
            <button className={classes.More} onClick={() => props.addIngredient(props.label)}>
                More
            </button>
        </div>
    );
};

export default BuildControl;
