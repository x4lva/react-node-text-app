import NotePage from "../../components/NotePage";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNoteData } from "../../services/NoteService";
import { setNoteData } from "../../redux/actions/NoteActions";

export default function Id(props) {
    return (
        <div>
            <NotePage />
        </div>
    );
}
