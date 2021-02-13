import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {createOrder} from '../../../store/actions'
import { checkValidity } from "../../../utils/checkValidity";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                label: 'Name',
                validity: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                label: 'Address',
                validity: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: '',
                label: 'State',
                validity: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    label: 'Country',
                    validity: {
                        required: true,

                    },
                    valid: false,
                    touched: false

            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pin Code'
                },
                value: '',
                label: 'Pin Code',
                validity: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E Mail'
                },
                value: '',
                label: 'Email',
                validity: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', label: 'Fastest'}, {value: 'cheapest', label: 'Cheapest'}]
                },
                value: 'fastest',
                label: 'Delivery method',
                validity: {
                    required: false,
                },
                valid: true
            }
        },
        isFormValid: false,
    };
    createOrderHandler = e => {
        e.preventDefault();
        // console.log("submit form", this.props.ingredients, this.props.totalPrice);
        const orderDetails = {};
        for(let formElementIdentier in this.state.orderForm) {
            orderDetails[formElementIdentier] = this.state.orderForm[formElementIdentier].value
        }
        // this.setState({ loading: true });
        const customerOrder = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderDetails: orderDetails,
            userId: this.props.userId
        };
        // console.log("axios", axiosInstance);

        // axiosInstance
        //     .post("/orders.json", customerOrder)
        //     .then(response => {
        //         this.setState({ loading: false });
        //         // console.log("response", response);
        //         this.props.history.push("/");
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //         // console.log("error", error);
        //     });

        this.props.purchaseBurgerHandler(customerOrder, this.props.token);
    };



    formInputHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        // this doesn't deep clone the object, just the first level
        const clonedOrderForm = {...this.state.orderForm};
        // clones object one level deeper
        const deepClonedToFirstLevel = {...clonedOrderForm[inputIdentifier]};
        // console.log(clonedOrderForm);
        deepClonedToFirstLevel.value = event.target.value;
        deepClonedToFirstLevel.valid = checkValidity(event.target.value, deepClonedToFirstLevel.validity);
        deepClonedToFirstLevel.touched = true;
        clonedOrderForm[inputIdentifier] = deepClonedToFirstLevel;
        let isFormValid = true;
        for(let key in clonedOrderForm) {
            // console.log(deepClonedToFirstLevel[key], isFormValid, 'voila', deepClonedToFirstLevel, key)
            isFormValid = clonedOrderForm[key].valid && isFormValid;
        }
        this.setState({orderForm: clonedOrderForm, isFormValid: isFormValid});
        // setTimeout(() => {
        //     console.log(this.state.isFormValid, this.state.orderForm, deepClonedToFirstLevel, isFormValid);
        // }, 0);


    }

    render() {
        // converting the state object to an array that can be looped through
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({id: key, config: this.state.orderForm[key]});
        }
        return (
            <div>
                <h4 className='text-mammoth'>Enter your contact data</h4>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={this.createOrderHandler}>
                        {
                            formElementsArray.map(element => {
                                return <Input key={element.id} id={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} label={element.config.label} valid={element.config.valid} touched={element.config.touched} required={element.config.validity.required} formInputHandler={this.formInputHandler}/>
                            })
                        }
                        <button type='submit' disabled={!this.state.isFormValid} onClick={this.createOrderHandler}>
                            ORDER
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurgerHandler: (customerOrder, authToken) => dispatch( createOrder(customerOrder, authToken))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));
