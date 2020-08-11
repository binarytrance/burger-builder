import React, { Component } from "react";

import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        };
        // can also be done in constructor
        componentWillMount() {
            this.requestInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.responseInterceptor = axiosInstance.interceptors.response.use(
                req => req,
                error => {
                    this.setState({ error: error });
                }
            );
        }
        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.response.eject(this.responseInterceptor);
        }
        errorConfirmHandler = () => {
            this.setState({ error: null });
        };
        render() {
            return (
                <>
                    <Modal closeModalHandler={this.errorConfirmHandler} show={this.state.error}>
                        Something went wrong! {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withErrorHandler;
