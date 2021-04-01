import App from "next/app";
import { Provider } from "react-redux";
import React from "react";

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps: pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Provider store={}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default MyApp;
