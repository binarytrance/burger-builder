import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../UI/Spinner/Spinner";

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
        console.log("submit form", this.props.ingredients);
        this.setState({ loading: true });
        const customerOrder = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
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
                <h4>Enter your contact data</h4>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <form>
                        <input type='text' name='name' placeholder='Enter your name' />
                        <input type='text' name='email' placeholder='Enter your email' />
                        <input type='text' name='street' placeholder='Street' />
                        <input type='text' name='postal' placeholder='Polstal code' />
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
