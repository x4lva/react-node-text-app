import NoteSidebarItem from "../NoteSidebarItem/NoteSidebarItem";
import React, { useEffect, useState } from "react";
import NoteEditor from "../NoteEditor/NoteEditor";
import Link from "next/link";
import NoteSidebarList from "../NoteSidebarList/NoteSidebarList";
import { getNotes } from "../../services/NoteService";
import { setUserNotes } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
function NotePage({ note }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [notesLoading, setNotesLoading] = useState(true);
    const [session, loading] = useSession();

    useEffect(() => {
        if (!loading) {
            getNotes(session.id).then((res) => {
                dispatch(setUserNotes(res));
                setNotesLoading(false);
            });
        }
    });

    return (
        <div className="note d-flex justify-content-between">
            <div className="note-sidebar">
                <div className="note-sidebar-header">
                    <Link href="/">
                        <i className="fas fa-chevron-left" />
                    </Link>
                    <span>Notes</span>
                    <i className="fas fa-bars" />
                </div>
                <div className="note-sidebar-list d-flex flex-column">
                    <NoteSidebarList />
                </div>
            </div>
            <div className="note-content">
                {/*<div className="note-content-header p-3 d-flex justify-content-between">*/}
                {/*    <div className="note-content-header-item">*/}
                {/*        <i className="fas fa-expand" />*/}
                {/*    </div>*/}
                {/*    <div className="note-content-header-item d-flex gap-4">*/}
                {/*        <i className="fas fa-history" />*/}
                {/*        <i className="fas fa-trash-alt" />*/}
                {/*        <i className="fas fa-info-circle" />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="note-content-text d-flex justify-content-center">
                    <NoteEditor />
                </div>
            </div>
        </div>
    );
}

export default NotePage;
