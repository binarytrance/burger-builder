import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
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
        isFormValid: false,
        isSignUpActive:true
    }

    // componentDidUpdate() {
    //     if(this.props.token) {
    //         this.setState({isSignUpActive: false});
    //     }
    // }

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
        // console.log(clonedControls, 'cloned cts');

        this.setState({controls: clonedControls, isFormValid: isFormValid});
        // setTimeout(() => {
        //     console.log(this.state.isFormValid, this.state.orderForm, deepClonedToFirstLevel, isFormValid);
        // }, 0);


    }
    authSubmitHandler = (event) => {
        console.log('asdf');
        event.preventDefault();
        if(this.state.isSignUpActive) {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUpActive)
        }
        else {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUpActive)
        }
    }
    toggleAuthMethod = () => {
        this.setState(prevState => {
            return {
                isSignUpActive: !prevState.isSignUpActive
            }
        })
    }
    render () {
        // converting the state object to an array that can be looped through
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({id: key, config: this.state.controls[key]});
        }
        return (
            <>
                <h1 className='text-center'>{this.state.isSignUpActive ? 'Sign Up' : 'Sign In'}</h1>
                {this.props.loading ? <Spinner/> : (
                    <>
                        <form onSubmit={this.authSubmitHandler} className='max-w-md mx-auto shadow-md p-3'>
                            {
                                formElementsArray.map(element => {
                                    return <Input key={element.id} id={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} label={element.config.label} valid={element.config.valid} touched={element.config.touched} required={element.config.validity.required} formInputHandler={this.formInputHandler}/>
                                })
                            }
                            <button type='submit' disabled={!this.state.isFormValid} onClick={this.createOrderHandler} className='bg-green-500 p-2 rounded text-white'>
                                Sign {this.state.isSignUpActive ? 'Up' : 'In'}
                            </button>
                            <p>{this.props.error ? this.props.error.message : null}</p>
                        </form>
                        <div className='flex flex-center mt-2'>
                            <button className='mx-auto max-w-md underline' onClick={this.toggleAuthMethod}>Sign {this.state.isSignUpActive ? 'In' : 'Up'} instead</button>
                        </div>
                    </>
                )}


            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);