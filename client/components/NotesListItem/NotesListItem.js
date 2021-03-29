import React from 'react';

function NotesListItem(props) {
    return (
        <div className="notes-list-item">
            <div className="notes-list-item-title">
                {props.note.title}
            </div>
            <div className="notes-list-item-content">
                {props.note.content}
            </div>
            <div className="notes-list-date">
                {props.note}
            </div>
        </div>
    );
}

export default NotesListItem;