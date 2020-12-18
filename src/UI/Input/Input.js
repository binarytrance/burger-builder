import React from "react";

const Input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case "input":
            inputElement = <input type={props.elementType} {...props.elementConfig} value={props.value} onChange={(event) => props.formInputHandler(event, props.id)}/>;
            break;
        case "textarea":
            inputElement = <textarea type={props.elementType} {...props.elementConfig} value={props.value}  onChange={(event) => props.formInputHandler(event, props.id)}/>;
            break;
        case 'select':
            inputElement = <select type={props.elementType} value={props.value} onChange={(event) => props.formInputHandler(event, props.id)}>{props.elementConfig.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>;
            break;
        default:
            inputElement = <input type={props.elementType} {...props.elementConfig} value={props.value}  onChange={(event) => props.formInputHandler(event, props.id)}/>;
            break;

    }
    console.log(props)
    return (
        <div className='flex flex-col mb-3'>
            <label className='block'>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
