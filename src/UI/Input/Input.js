import React from "react";

const Input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case "input":
            inputElement = <input type={props.elementType} {...props.elementConfig} defaultValue={props.value}/>;
            break;
        case "textarea":
            inputElement = <textarea type={props.elementType} {...props.elementConfig} defaultValue={props.value} />;
            break;
        case 'select':
            inputElement = <select type={props.elementType} defaultValue={props.value}>{props.elementConfig.options.map(option => <option key={option.value} defaultValue={option.value}>{option.label}</option>)}</select>;
            break;
        default:
            inputElement = <input type={props.elementType} {...props.elementConfig} defaultValue={props.value} />;
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
