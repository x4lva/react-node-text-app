import React, { Component } from "react";
import BackButton from "../BackButton";
import { providers, signIn } from "next-auth/client";

function LoginPage({ providers }) {
    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <BackButton href="/" icon={<i className="fas fa-chevron-left" />} />
            <div className="app-form col-12 col-md-6 col-lg-3 border-1 p-3 rounded-1 pt-3 bg-white">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LoginPage;
