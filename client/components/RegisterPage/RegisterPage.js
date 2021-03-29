import React from 'react';
import Link from "next/link";
import BackButton from "../BackButton";

function RegisterPage(props) {
    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <BackButton href="/" icon={<i className="fas fa-chevron-left"></i>}/>
            <div className="app-form col-12 col-md-6 col-lg-3 border-1 p-3 rounded-1 pt-3 bg-white">
                <h2 className="fw-bold text-uppercase text-center pb-2 fw-bold">Register</h2>
                <form className="d-flex flex-column">
                    <input
                        className="form-control mb-2"
                        placeholder="Name"
                        required
                        type="text"/>
                    <input
                        className="form-control mb-2"
                        placeholder="Email"
                        required
                        type="email"/>
                    <input
                        className="form-control mb-2"
                        placeholder="Password"
                        required
                        type="password"/>
                    <input
                        className="form-control mb-2"
                        placeholder="Repeat password"
                        required
                        type="password"/>

                    <button className="btn btn-dark text-uppercase" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;