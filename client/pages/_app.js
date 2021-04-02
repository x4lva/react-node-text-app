import "../styles/globals.css";
import "../styles/bootstrap.min.css";
import { Provider } from "react-redux";
import React from "react";
import withRedux from "next-redux-wrapper";
import store from "../redux/store";
import { Provider as SessionProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
