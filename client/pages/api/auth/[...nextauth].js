import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: "/signin",
        signOut: "/",
    },
    callbacks: {
        session: async (session, user) => {
            session.id = user.id;
            return Promise.resolve(session);
        },
    },
    database:
        "mongodb+srv://x4lva:dimonchak@cluster0.tuqkc.mongodb.net/notes?retryWrites=true&w=majority",
};

export default (req, res) => NextAuth(req, res, options);
