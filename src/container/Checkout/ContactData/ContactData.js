import React, { Component } from "react";

class ContactData extends Component() {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        }
    };
    createOrder() {
        console.log("submit form");
    }

    render() {
        return (
            <div>
                <h4>Enter your contact data</h4>
                <form>
                    <input type='text' name='name' placeholder='Enter your name' />
                    <input type='text' name='email' placeholder='Enter your email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postal' placeholder='Polstal code' />
                    <button type='submit' onClick={this.createOrder}>
                        ORDER
                    </button>
                </form>
            </div>
        );
    }
}

export default ContactData;
