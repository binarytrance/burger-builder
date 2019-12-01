import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = props => {
  const BuildControlsLayout = Object.keys(props.ingredients).map((IName, i) => {
    console.log(IName);
    return <BuildControl key={IName + i} label={IName} />;
  });
  console.log(props.ingredients, BuildControlsLayout);

  return <div className={classes.BuildControls}>{BuildControlsLayout}</div>;
};

export default BuildControls;
