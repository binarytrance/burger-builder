import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";

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
                label: 'Name'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                label: 'Address'
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: '',
                label: 'State'
            },
            country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    label: 'Country'

            },
            pinCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pin Code'
                },
                value: '',
                label: 'Pin Code'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E Mail'
                },
                value: '',
                label: 'Email'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', label: 'Fastest'}, {value: 'cheapest', label: 'Cheapest'}]
                },
                value: '',
                label: 'Delivery method'
            }
        },
        loading: false
    };
    createOrderHandler = e => {
        e.preventDefault();
        console.log("submit form", this.props.ingredients, this.props.totalPrice);
        const orderDetails = {};
        for(let formElementIdentier in this.state.orderForm) {
            orderDetails[formElementIdentier] = this.state.orderForm[formElementIdentier].value
        }
        this.setState({ loading: true });
        const customerOrder = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderDetails: orderDetails
        };
        // console.log("axios", axiosInstance);

        axiosInstance
            .post("/orders.json", customerOrder)
            .then(response => {
                this.setState({ loading: false });
                // console.log("response", response);
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false });
                // console.log("error", error);
            });
    };

    formInputHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        // this doesn't deep clone the object, just the first level
        const clonedOrderForm = {...this.state.orderForm};
        const deepClonedToFirstLevel = {...clonedOrderForm[inputIdentifier]};
        console.log(clonedOrderForm);
        deepClonedToFirstLevel.value = event.target.value;
        clonedOrderForm[inputIdentifier] = deepClonedToFirstLevel;
        this.setState({orderForm: clonedOrderForm});
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({id: key, config: this.state.orderForm[key]});
        }
        return (
            <div>
                <h4 className='text-mammoth'>Enter your contact data</h4>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={this.createOrderHandler}>
                        {
                            formElementsArray.map(element => {
                                return <Input key={element.id} id={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} label={element.config.label} formInputHandler={this.formInputHandler}/>
                            })
                        }
                        <button type='submit' onClick={this.createOrderHandler}>
                            ORDER
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export default ContactData;
