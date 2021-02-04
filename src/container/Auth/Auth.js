import React, { Component } from 'react';
import Input from '../../UI/Input/Input';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                label: 'Email',
                validity: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: 'Password',
                validity: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    formInputHandler = (event, controlName) => {
        const clonedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validity)
            }
        }
        let isFormValid = true;
        // for(let key in clonedControls) {
        //     isFormValid = key.valid && key.touched && isFormValid;
        // }
        console.log(clonedControls, 'cloned cts');

        this.setState({controls: clonedControls, isFormValid: isFormValid});
        // setTimeout(() => {
        //     console.log(this.state.isFormValid, this.state.orderForm, deepClonedToFirstLevel, isFormValid);
        // }, 0);


    }
    render () {
        // converting the state object to an array that can be looped through
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({id: key, config: this.state.controls[key]});
        }
        return (
            <>
                <form onSubmit={this.createOrderHandler}>
                        {
                            formElementsArray.map(element => {
                                console.log(element);

                                return <Input key={element.id} id={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} label={element.config.label} valid={element.config.valid} touched={element.config.touched} required={element.config.validity.required} formInputHandler={this.formInputHandler}/>
                            })
                        }
                        <button type='submit' disabled={!this.state.isFormValid} onClick={this.createOrderHandler}>
                            Sign in
                        </button>
                    </form>
            </>
        )
    }
}

export default Auth;