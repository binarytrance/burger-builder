import React from "react";

const Input = props => {
    let inputElement = null;

    switch (props.inputType) {
        case "input":
            inputElement = <input {...props} />;
            break;
        case "textarea":
            inputElement = <textarea {...props} />;
            break;
        default:
            inputElement = <input {...props} />;
            break;
    }
    return (
        <div className='flex flex-col mb-3'>
            <label className='block'>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
