import React from 'react';
import SectionWrapper from "../SectionWrapper/SectionWrapper";
import NotesList from "../NotesList/NotesList";

function NotesPage(props) {
    return (
        <div className="container-fluid d-flex align-items-center flex-column">
            <div className="col-10">
                <div className="notes-header d-flex flex-row justify-content-between mt-3">
                    <h2 className="text-light fw-bold">Notes</h2>
                    <div className="notes-actions">
                        <div className="btn btn-outline-light me-3">Create notebook</div>
                        <div className="btn btn-light">Create note</div>
                    </div>
                </div>
                <SectionWrapper title="Notes">
                    <NotesList />
                </SectionWrapper>
            </div>
        </div>
    );
}

export default NotesPage;