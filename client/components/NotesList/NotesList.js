import React from 'react';
import NotesListItem from "../NotesListItem/NotesListItem";
import NodeListAdd from "../NodeListAdd/NodeListAdd";

function NotesList(props) {
    return (
        <div className="notes-list d-flex gap-3">
            <NotesListItem />
            <NotesListItem />
            <NotesListItem />
            <NotesListItem />
            <NodeListAdd />
        </div>
    );
}

export default NotesList;