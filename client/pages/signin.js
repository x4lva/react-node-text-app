import React from "react";
import { providers, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import BackButton from "../components/BackButton";

export default function SignIn({ providers }) {
    const router = useRouter();

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <BackButton href="/" icon={<i className="fas fa-chevron-left" />} />
            <div className="app-form col-12 col-md-6 col-lg-2 border-1 p-3 rounded-1 pt-3 bg-white">
                {Object.values(providers).map((provider) => (
                    <button
                        key={provider.name}
                        className="btn btn-dark w-100 mb-2"
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: router.query.callbackUrl,
                            })
                        }
                    >
                        Sign in with {provider.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    };
};
