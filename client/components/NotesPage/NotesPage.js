import React from "react";
import SectionWrapper from "../SectionWrapper/SectionWrapper";
import NotesList from "../NotesList";
import TextareaAutosize from "react-textarea-autosize";
import SavedTabs from "../SavedTabs/SavedTabs";

function NotesPage(props) {
    return (
        <div className="container-fluid d-flex align-items-center flex-column">
            <div className="col-10">
                <div className="notes-section">
                    <div className="notes-header d-flex flex-row justify-content-between mt-3">
                        <h2 className="text-light fw-bold">Notes</h2>
                        <div className="notes-actions">
                            <div className="btn btn-outline-light">
                                Create note
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
                                    <i className="fas fa-bars"></i>
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
                                ></TextareaAutosize>
                            </SectionWrapper>
                        </div>
                    </div>

                    <div className="notes-section h-100 w-75">
                        <div className="notes-header d-flex flex-row justify-content-between mt-3">
                            <h2 className="text-light fw-bold">Saved</h2>
                            <div className="notes-actions">
                                <div className="btn text-light">
                                    <i className="fas fa-bars"></i>
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

export default NotesPage;
