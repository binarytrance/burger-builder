import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";

class ContactData extends Component {
    state = {
        address: {
            name: "",
            email: "",
            address: {
                street: "",
                postalCode: ""
            }
        },
        loading: false
    };
    createOrderHandler = e => {
        e.preventDefault();
        console.log("submit form", this.props.ingredients, this.props.totalPrice);
        this.setState({ loading: true });
        const customerOrder = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customerDetails: {
                address: {
                    street: "checkout street",
                    state: "KA",
                    pinCode: "214453"
                },
                email: "ganeshan.dash@gmail.com"
            }
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

    render() {
        return (
            <div>
                <h4 className='text-mammoth'>Enter your contact data</h4>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <form>
                        <Input
                            label='Enter your name'
                            inputType='text'
                            name='name'
                            placeholder='Enter your name'
                        />
                        <Input
                            label='Enter your email'
                            inputType='text'
                            name='email'
                            placeholder='Enter your email'
                        />
                        <Input
                            label='Enter your address'
                            inputType='text'
                            name='street'
                            placeholder='Street'
                        />
                        <Input
                            label='Enter your pin code'
                            inputType='text'
                            name='postal'
                            placeholder='Polstal code'
                        />
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
