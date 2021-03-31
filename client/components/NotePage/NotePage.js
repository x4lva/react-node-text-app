import NoteSidebarItem from "../NoteSidebarItem/NoteSidebarItem";
import React from "react";

import NoteEditor from "../NoteEditor/NoteEditor";

function NotePage(props) {
    return (
        <div className="note d-flex justify-content-between">
            <div className="note-sidebar">
                <div className="note-sidebar-list d-flex flex-column">
                    <NoteSidebarItem active={true} />
                    <NoteSidebarItem />
                    <NoteSidebarItem />
                    <NoteSidebarItem />
                    <NoteSidebarItem />
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
