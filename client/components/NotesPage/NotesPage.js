import React, { useEffect, useState } from "react";
import SectionWrapper from "../SectionWrapper/SectionWrapper";
import NotesList from "../NotesList";
import TextareaAutosize from "react-textarea-autosize";
import SavedTabs from "../SavedTabs/SavedTabs";
import BackButton from "../BackButton";
import { signOut, useSession } from "next-auth/client";
import { getNotes } from "../../services/NoteService";
import { setUserNotes } from "../../redux/actions/UserActions";
import { useDispatch } from "react-redux";
import firebase from "../../utils/Firebase";
import { useRouter } from "next/router";

export default function NotesPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [notesLoading, setNotesLoading] = useState(true);
    const [session, loading] = useSession();

    useEffect(() => {
        const db = firebase.database().ref("notes");

        db.once("value").then((snapshot) => {
            let notes = [];
            snapshot.forEach((el) => {
                if (el.val().author === session.id) {
                    notes.push(el);
                }
            });
            console.log(notes);
            dispatch(setUserNotes(notes));
            setNotesLoading(false);
        });
    }, []);

    if (notesLoading) {
        return <h1 className="text-light">Notes are loading</h1>;
    }

    return (
        <div className="container-fluid d-flex align-items-center flex-column">
            <BackButton
                onClick={signOut}
                href="/"
                icon={<i className="fas fa-sign-out-alt" />}
            />
            <div className="col-10">
                <div className="notes-section">
                    <div className="notes-header d-flex flex-row justify-content-between mt-3">
                        <h2 className="text-light fw-bold">Notes</h2>
                        <div className="notes-actions">
                            <div className="btn text-light">
                                <i className="fas fa-bars" />
                            </div>
                        </div>
                    </div>
                    <div className="notes-content">
                        <SectionWrapper>
                            <NotesList />
                        </SectionWrapper>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between gap-4">
                    <div className="notes-section w-25">
                        <div className="notes-header d-flex flex-row justify-content-between mt-3">
                            <h2 className="text-light fw-bold">Notebook</h2>
                            <div className="notes-actions">
                                <div className="btn text-light">
                                    <i className="fas fa-bars" />
                                </div>
                            </div>
                        </div>
                        <div className="notes-content">
                            <SectionWrapper>
                                <TextareaAutosize
                                    resize="false"
                                    className="form-control app-textarea"
                                    minRows={10}
                                    maxRows={10}
                                    placeholder="Write  something..."
                                />
                            </SectionWrapper>
                        </div>
                    </div>

                    <div className="notes-section h-100 w-75">
                        <div className="notes-header d-flex flex-row justify-content-between mt-3">
                            <h2 className="text-light fw-bold">Saved</h2>
                            <div className="notes-actions">
                                <div className="btn text-light">
                                    <i className="fas fa-bars" />
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 282 }} className="notes-content">
                            <SectionWrapper>
                                <SavedTabs />
                            </SectionWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
