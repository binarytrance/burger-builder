import React from "react";
import classes from "./Modal.module.css";

const Modal = props => {
    console.log(props.show, props);
    return (
        <>
            {props.show ? (
                <>
                    <div
                        className={classes.Backdrop}
                        style={{ display: props.show ? `display: 'block'` : `display: 'none'` }}
                        onClick={props.closeModalHandler}
                    ></div>
                    <div
                        className={classes.Modal}
                        style={{ display: props.show ? `display: 'block'` : `display: 'none'` }}
                    >
                        {props.children}
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Modal;
