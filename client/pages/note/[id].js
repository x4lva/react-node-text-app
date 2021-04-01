import NotePage from "../../components/NotePage";
import { useRouter } from "next/router";

export default function Id() {
    const router = useRouter();

    const { id } = router.query;

    return (
        <div>
            <NotePage />
        </div>
    );
}
