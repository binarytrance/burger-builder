import React from "react";

const Input = props => {
    let inputElement = null;
    console.log('touched', props.touched);

    switch (props.elementType) {
        case "input":
            inputElement = <input className={!props.valid && props.required && props.touched ?  'border-solid border-2 border-red-300' : ''} type={props.elementType} {...props.elementConfig} value={props.value} onChange={(event) => props.formInputHandler(event, props.id)}/>;
            break;
        case "textarea":
            inputElement = <textarea className={!props.valid && props.required && props.touched ?  'border-solid border-2 border-red-300' : ''} type={props.elementType} {...props.elementConfig} value={props.value}  onChange={(event) => props.formInputHandler(event, props.id)}/>;
            break;
        case 'select':
            inputElement = <select className={!props.valid && props.required && props.touched ?  'border-solid border-2 border-red-300' : ''} type={props.elementType} value={props.value} onChange={(event) => props.formInputHandler(event, props.id)}>{props.elementConfig.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>;
            break;
        default:
            inputElement = <input className={!props.valid && props.required && props.touched ?  'border-solid border-2 border-red-300' : ''} type={props.elementType} {...props.elementConfig} value={props.value}  onChange={(event) => props.formInputHandler(event, props.id)}/>;
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
