import React from 'react';
import Link from "next/link";
import BackButton from "../BackButton";

function LoginPage(props) {
    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <BackButton href="/" icon={<i className="fas fa-chevron-left"></i>}/>
            <div className="app-form col-12 col-md-6 col-lg-3 border-1 p-3 rounded-1 pt-3 bg-white">
                <h2 className="fw-bold text-uppercase text-center pb-2 fw-bold">Login</h2>
                <form className="d-flex flex-column">

                    <div className="input-group mb-2">
                        <input
                            placeholder="Email"
                            className="form-control"
                            required
                            type="email"/>
                    </div>
                    <div className="input-group mb-2">
                        <input
                            placeholder="Password"
                            className="form-control"
                            required
                            type="password"/>
                    </div>

                    <button className="btn btn-dark text-uppercase" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;