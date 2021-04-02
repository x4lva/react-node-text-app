import AppIndex from "../components/AppIndex/AppIndex";
import { useSession } from "next-auth/client";
import NotesPage from "../components/NotesPage";

export default function Home({ notes }) {
    const [session, loading] = useSession();

    if (loading) {
        return "Loading";
    }

    if (session) {
        return <NotesPage />;
    }

    return <AppIndex />;
}
